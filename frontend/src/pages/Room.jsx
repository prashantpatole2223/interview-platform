import React, {
    useEffect,
    useRef,
    useState,
} from "react";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

import api from "../services/api";
import socket from "../services/socket";

import { useAuth } from "../context/AuthContext";

import RoomHeader from "../components/room/RoomHeader";
import VideoCard from "../components/room/VideoCard";
import RoomControls from "../components/room/RoomControls";
import RoomSidebar from "../components/room/RoomSidebar";
import MobileRoom from "../components/room/MobileRoom";


const Room = () => {

    const { roomCode } = useParams();

    const navigate = useNavigate();

    const { user } = useAuth();


    /*
    |--------------------------------------------------------------------------
    | ROOM STATE
    |--------------------------------------------------------------------------
    */

    const [room, setRoom] = useState(null);

    const [loading, setLoading] = useState(true);

    const [participantConnected, setParticipantConnected] =
        useState(false);


    /*
    |--------------------------------------------------------------------------
    | CHAT STATE
    |--------------------------------------------------------------------------
    */

    const [messages, setMessages] = useState([]);

    const [message, setMessage] = useState("");


    /*
    |--------------------------------------------------------------------------
    | UI STATE
    |--------------------------------------------------------------------------
    */

    const [activePanel, setActivePanel] = useState(null);

    const [cameraEnabled, setCameraEnabled] = useState(true);

    const [microphoneEnabled, setMicrophoneEnabled] =
        useState(true);


    /*
    |--------------------------------------------------------------------------
    | VIDEO REFS
    |--------------------------------------------------------------------------
    */

    const localDesktopVideoRef = useRef(null);

    const localMobileVideoRef = useRef(null);

    const remoteDesktopVideoRef = useRef(null);

    const remoteMobileVideoRef = useRef(null);


    /*
    |--------------------------------------------------------------------------
    | WEBRTC REFS
    |--------------------------------------------------------------------------
    */

    const localStreamRef = useRef(null);

    const peerConnectionRef = useRef(null);

    const remoteSocketIdRef = useRef(null);

    const pendingIceCandidatesRef = useRef([]);

    const tracksAddedRef = useRef(false);


    /*
    |--------------------------------------------------------------------------
    | WEBRTC CONFIGURATION
    |--------------------------------------------------------------------------
    */

    const peerConfiguration = {
        iceServers: [
            {
                urls: "stun:stun.l.google.com:19302",
            },
        ],
    };


    /*
    |--------------------------------------------------------------------------
    | FETCH ROOM
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        const fetchRoom = async () => {

            try {

                const response = await api.get(
                    `/room/${roomCode}`
                );

                const roomData =
                    response.data.data;

                setRoom(roomData);

                console.log(
                    "Room data:",
                    roomData
                );

                console.log(
                    "Room participants:",
                    roomData?.participants
                );

            } catch (error) {

                console.error(
                    "Failed to fetch room:",
                    error
                );

                alert(
                    error.response?.data?.message ||
                    "Failed to load room."
                );

                navigate("/dashboard");

            } finally {

                setLoading(false);

            }
        };


        fetchRoom();

    }, [roomCode, navigate]);


    /*
    |--------------------------------------------------------------------------
    | ATTACH LOCAL STREAM
    |--------------------------------------------------------------------------
    */

    const attachLocalStreamToVideos = (stream) => {

        if (localDesktopVideoRef.current) {

            localDesktopVideoRef.current.srcObject =
                stream;

        }

        if (localMobileVideoRef.current) {

            localMobileVideoRef.current.srcObject =
                stream;

        }
    };


    /*
    |--------------------------------------------------------------------------
    | ATTACH REMOTE STREAM
    |--------------------------------------------------------------------------
    */

    const attachRemoteStreamToVideos = (stream) => {

        if (remoteDesktopVideoRef.current) {

            remoteDesktopVideoRef.current.srcObject =
                stream;

        }

        if (remoteMobileVideoRef.current) {

            remoteMobileVideoRef.current.srcObject =
                stream;

        }
    };


    /*
    |--------------------------------------------------------------------------
    | START LOCAL MEDIA
    |--------------------------------------------------------------------------
    */

    const startLocalMedia = async () => {

        if (localStreamRef.current) {

            attachLocalStreamToVideos(
                localStreamRef.current
            );

            return localStreamRef.current;
        }


        try {

            const stream =
                await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true,
                });


            localStreamRef.current = stream;

            attachLocalStreamToVideos(stream);

            return stream;

        } catch (error) {

            console.error(
                "Could not access camera/microphone:",
                error
            );

            alert(
                "Camera or microphone permission was denied. Please allow access and reload the room."
            );

            throw error;
        }
    };


    /*
    |--------------------------------------------------------------------------
    | FLUSH ICE CANDIDATES
    |--------------------------------------------------------------------------
    */

    const flushPendingIceCandidates = async () => {

        const peerConnection =
            peerConnectionRef.current;


        if (!peerConnection) {
            return;
        }


        if (!peerConnection.remoteDescription) {
            return;
        }


        const pendingCandidates =
            pendingIceCandidatesRef.current;


        pendingIceCandidatesRef.current = [];


        for (const candidate of pendingCandidates) {

            try {

                await peerConnection.addIceCandidate(
                    new RTCIceCandidate(candidate)
                );

            } catch (error) {

                console.error(
                    "Failed to add queued ICE candidate:",
                    error
                );

            }
        }
    };


    /*
    |--------------------------------------------------------------------------
    | CREATE PEER CONNECTION
    |--------------------------------------------------------------------------
    */

    const createPeerConnection = () => {

        if (peerConnectionRef.current) {

            return peerConnectionRef.current;

        }


        const peerConnection =
            new RTCPeerConnection(
                peerConfiguration
            );


        peerConnection.ontrack = (event) => {

            const [remoteStream] =
                event.streams;


            if (remoteStream) {

                attachRemoteStreamToVideos(
                    remoteStream
                );

            }
        };


        peerConnection.onicecandidate = (event) => {

            if (
                !event.candidate ||
                !remoteSocketIdRef.current
            ) {
                return;
            }


            socket.emit(
                "ice-candidate",
                {
                    candidate: event.candidate,

                    targetSocketId:
                        remoteSocketIdRef.current,
                }
            );
        };


        peerConnection.onconnectionstatechange =
            () => {

                console.log(
                    "WebRTC connection state:",
                    peerConnection.connectionState
                );


                if (
                    peerConnection.connectionState ===
                    "connected"
                ) {

                    setParticipantConnected(true);

                }


                if (
                    peerConnection.connectionState ===
                        "disconnected" ||
                    peerConnection.connectionState ===
                        "failed" ||
                    peerConnection.connectionState ===
                        "closed"
                ) {

                    setParticipantConnected(false);

                }
            };


        peerConnectionRef.current =
            peerConnection;


        return peerConnection;
    };


    /*
    |--------------------------------------------------------------------------
    | ADD LOCAL TRACKS
    |--------------------------------------------------------------------------
    */

    const addLocalTracks = () => {

        const stream =
            localStreamRef.current;

        const peerConnection =
            peerConnectionRef.current;


        if (
            !stream ||
            !peerConnection
        ) {
            return;
        }


        if (tracksAddedRef.current) {
            return;
        }


        stream.getTracks().forEach(
            (track) => {

                peerConnection.addTrack(
                    track,
                    stream
                );

            }
        );


        tracksAddedRef.current = true;
    };


    /*
    |--------------------------------------------------------------------------
    | CREATE OFFER
    |--------------------------------------------------------------------------
    */

    const createOffer = async (
        targetSocketId
    ) => {

        try {

            remoteSocketIdRef.current =
                targetSocketId;


            const peerConnection =
                createPeerConnection();


            addLocalTracks();


            const offer =
                await peerConnection.createOffer();


            await peerConnection.setLocalDescription(
                offer
            );


            socket.emit(
                "offer",
                {
                    offer:
                        peerConnection.localDescription,

                    targetSocketId,
                }
            );

        } catch (error) {

            console.error(
                "Failed to create offer:",
                error
            );

        }
    };


    /*
    |--------------------------------------------------------------------------
    | HANDLE OFFER
    |--------------------------------------------------------------------------
    */

    const handleOffer = async ({
        offer,
        senderSocketId,
    }) => {

        try {

            remoteSocketIdRef.current =
                senderSocketId;


            const peerConnection =
                createPeerConnection();


            addLocalTracks();


            await peerConnection.setRemoteDescription(
                new RTCSessionDescription(offer)
            );


            await flushPendingIceCandidates();


            const answer =
                await peerConnection.createAnswer();


            await peerConnection.setLocalDescription(
                answer
            );


            socket.emit(
                "answer",
                {
                    answer:
                        peerConnection.localDescription,

                    targetSocketId:
                        senderSocketId,
                }
            );

        } catch (error) {

            console.error(
                "Failed to handle offer:",
                error
            );

        }
    };


    /*
    |--------------------------------------------------------------------------
    | HANDLE ANSWER
    |--------------------------------------------------------------------------
    */

    const handleAnswer = async ({
        answer,
        senderSocketId,
    }) => {

        try {

            remoteSocketIdRef.current =
                senderSocketId;


            const peerConnection =
                peerConnectionRef.current;


            if (!peerConnection) {

                console.error(
                    "Peer connection does not exist."
                );

                return;
            }


            await peerConnection.setRemoteDescription(
                new RTCSessionDescription(answer)
            );


            await flushPendingIceCandidates();

        } catch (error) {

            console.error(
                "Failed to handle answer:",
                error
            );

        }
    };


    /*
    |--------------------------------------------------------------------------
    | HANDLE ICE
    |--------------------------------------------------------------------------
    */

    const handleIceCandidate = async ({
        candidate,
        senderSocketId,
    }) => {

        try {

            remoteSocketIdRef.current =
                senderSocketId;


            const peerConnection =
                peerConnectionRef.current;


            if (!peerConnection) {

                pendingIceCandidatesRef.current.push(
                    candidate
                );

                return;
            }


            if (!peerConnection.remoteDescription) {

                pendingIceCandidatesRef.current.push(
                    candidate
                );

                return;
            }


            await peerConnection.addIceCandidate(
                new RTCIceCandidate(candidate)
            );

        } catch (error) {

            console.error(
                "Failed to add ICE candidate:",
                error
            );

        }
    };


    /*
    |--------------------------------------------------------------------------
    | HANDLE PARTICIPANT LEFT
    |--------------------------------------------------------------------------
    */

    const handleUserLeft = ({
        socketId,
    }) => {

        if (
            remoteSocketIdRef.current &&
            socketId !== remoteSocketIdRef.current
        ) {

            return;

        }


        setParticipantConnected(false);

        remoteSocketIdRef.current = null;

        pendingIceCandidatesRef.current = [];

        tracksAddedRef.current = false;


        if (remoteDesktopVideoRef.current) {

            remoteDesktopVideoRef.current.srcObject =
                null;

        }


        if (remoteMobileVideoRef.current) {

            remoteMobileVideoRef.current.srcObject =
                null;

        }


        if (peerConnectionRef.current) {

            peerConnectionRef.current.close();

            peerConnectionRef.current = null;

        }
    };


    /*
    |--------------------------------------------------------------------------
    | SOCKET.IO
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (loading) {
            return;
        }


        let cancelled = false;


        const handleUserJoined = async ({
            socketId,
        }) => {

            if (cancelled) {
                return;
            }


            await createOffer(socketId);

        };


        const handleRoomUsers = ({
            participantCount,
        }) => {

            if (participantCount >= 2) {

                setParticipantConnected(true);

            }

        };


        const handleReceiveMessage = ({
            socketId,
            message,
            createdAt,
        }) => {

            setMessages(
                (previousMessages) => [
                    ...previousMessages,
                    {
                        socketId,
                        message,
                        createdAt,
                    },
                ]
            );

        };


        socket.on(
            "user-joined",
            handleUserJoined
        );

        socket.on(
            "room-users",
            handleRoomUsers
        );

        socket.on(
            "receive-message",
            handleReceiveMessage
        );

        socket.on(
            "offer",
            handleOffer
        );

        socket.on(
            "answer",
            handleAnswer
        );

        socket.on(
            "ice-candidate",
            handleIceCandidate
        );

        socket.on(
            "user-left",
            handleUserLeft
        );


        const startRoom = async () => {

            try {

                await startLocalMedia();


                if (cancelled) {
                    return;
                }


                if (!socket.connected) {

                    socket.connect();

                }


                if (socket.connected) {

                    socket.emit(
                        "join-room",
                        roomCode
                    );

                } else {

                    socket.once(
                        "connect",
                        () => {

                            if (!cancelled) {

                                socket.emit(
                                    "join-room",
                                    roomCode
                                );

                            }

                        }
                    );

                }

            } catch (error) {

                console.error(
                    "Failed to start room:",
                    error
                );

            }
        };


        startRoom();


        return () => {

            cancelled = true;


            socket.off(
                "user-joined",
                handleUserJoined
            );

            socket.off(
                "room-users",
                handleRoomUsers
            );

            socket.off(
                "receive-message",
                handleReceiveMessage
            );

            socket.off(
                "offer",
                handleOffer
            );

            socket.off(
                "answer",
                handleAnswer
            );

            socket.off(
                "ice-candidate",
                handleIceCandidate
            );

            socket.off(
                "user-left",
                handleUserLeft
            );


            if (socket.connected) {

                socket.emit(
                    "leave-room",
                    roomCode
                );

            }


            if (peerConnectionRef.current) {

                peerConnectionRef.current.close();

                peerConnectionRef.current = null;

            }


            if (localStreamRef.current) {

                localStreamRef.current
                    .getTracks()
                    .forEach((track) => {
                        track.stop();
                    });

                localStreamRef.current = null;

            }


            if (localDesktopVideoRef.current) {

                localDesktopVideoRef.current.srcObject =
                    null;

            }


            if (localMobileVideoRef.current) {

                localMobileVideoRef.current.srcObject =
                    null;

            }


            if (remoteDesktopVideoRef.current) {

                remoteDesktopVideoRef.current.srcObject =
                    null;

            }


            if (remoteMobileVideoRef.current) {

                remoteMobileVideoRef.current.srcObject =
                    null;

            }


            remoteSocketIdRef.current = null;

            pendingIceCandidatesRef.current = [];

            tracksAddedRef.current = false;


            socket.disconnect();

        };

    }, [loading, roomCode]);


    /*
    |--------------------------------------------------------------------------
    | MICROPHONE
    |--------------------------------------------------------------------------
    */

    const toggleMicrophone = () => {

        const stream =
            localStreamRef.current;


        if (!stream) {
            return;
        }


        const audioTracks =
            stream.getAudioTracks();


        if (!audioTracks.length) {
            return;
        }


        const nextState =
            !microphoneEnabled;


        audioTracks.forEach(
            (track) => {

                track.enabled =
                    nextState;

            }
        );


        setMicrophoneEnabled(
            nextState
        );
    };


    /*
    |--------------------------------------------------------------------------
    | CAMERA
    |--------------------------------------------------------------------------
    */

    const toggleCamera = () => {

        const stream =
            localStreamRef.current;


        if (!stream) {
            return;
        }


        const videoTracks =
            stream.getVideoTracks();


        if (!videoTracks.length) {
            return;
        }


        const nextState =
            !cameraEnabled;


        videoTracks.forEach(
            (track) => {

                track.enabled =
                    nextState;

            }
        );


        setCameraEnabled(
            nextState
        );
    };


    /*
    |--------------------------------------------------------------------------
    | CHAT
    |--------------------------------------------------------------------------
    */

    const sendMessage = (e) => {

        e.preventDefault();


        const trimmedMessage =
            message.trim();


        if (!trimmedMessage) {
            return;
        }


        socket.emit(
            "send-message",
            {
                roomCode,
                message: trimmedMessage,
            }
        );


        setMessage("");
    };


    /*
    |--------------------------------------------------------------------------
    | LEAVE ROOM
    |--------------------------------------------------------------------------
    */

    const leaveRoom = async () => {

        try {

            await api.post(
                "/room/leave",
                {
                    roomCode,
                }
            );

        } catch (error) {

            console.error(
                "Failed to leave room:",
                error
            );

        } finally {

            if (socket.connected) {

                socket.emit(
                    "leave-room",
                    roomCode
                );

            }


            if (peerConnectionRef.current) {

                peerConnectionRef.current.close();

                peerConnectionRef.current = null;

            }


            if (localStreamRef.current) {

                localStreamRef.current
                    .getTracks()
                    .forEach((track) => {
                        track.stop();
                    });

                localStreamRef.current = null;

            }


            socket.disconnect();


            navigate("/dashboard");

        }
    };


    /*
    |--------------------------------------------------------------------------
    | LOADING
    |--------------------------------------------------------------------------
    */

    if (loading) {

        return (
            <div className="flex min-h-screen items-center justify-center bg-[#080b12] text-white">

                <div className="text-center">

                    <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-gray-700 border-t-white" />

                    <p className="text-sm text-gray-400">
                        Loading interview room...
                    </p>

                </div>

            </div>
        );
    }


    /*
    |--------------------------------------------------------------------------
    | MAIN UI
    |--------------------------------------------------------------------------
    */

    return (

        <div className="fixed inset-0 flex flex-col overflow-hidden bg-[#080b12] text-white">

            <RoomHeader
                roomCode={roomCode}
                participantConnected={
                    participantConnected
                }
                onLeave={leaveRoom}
            />


            <main className="relative min-h-0 flex-1">

                <div className="hidden h-full lg:flex">

                    <section className="flex min-w-0 flex-1 flex-col p-4 xl:p-5">

                        <div className="grid min-h-0 flex-1 grid-cols-2 gap-4">

                            <VideoCard
                                videoRef={
                                    remoteDesktopVideoRef
                                }
                                participantConnected={
                                    participantConnected
                                }
                            />

                            <VideoCard
                                videoRef={
                                    localDesktopVideoRef
                                }
                                isLocal
                                cameraEnabled={
                                    cameraEnabled
                                }
                                userName={
                                    user?.name
                                }
                            />

                        </div>


                        <RoomControls
                            microphoneEnabled={
                                microphoneEnabled
                            }
                            cameraEnabled={
                                cameraEnabled
                            }
                            activePanel={
                                activePanel
                            }
                            messagesCount={
                                messages.length
                            }
                            onToggleMicrophone={
                                toggleMicrophone
                            }
                            onToggleCamera={
                                toggleCamera
                            }
                            onToggleChat={() =>
                                setActivePanel(
                                    activePanel ===
                                        "chat"
                                        ? null
                                        : "chat"
                                )
                            }
                            onTogglePeople={() =>
                                setActivePanel(
                                    activePanel ===
                                        "people"
                                        ? null
                                        : "people"
                                )
                            }
                        />

                    </section>


                    <RoomSidebar
                        activePanel={
                            activePanel
                        }
                        setActivePanel={
                            setActivePanel
                        }
                        messages={
                            messages
                        }
                        message={
                            message
                        }
                        socketId={
                            socket.id
                        }
                        user={
                            user
                        }
                        room={
                            room
                        }
                        participantConnected={
                            participantConnected
                        }
                        onMessageChange={
                            setMessage
                        }
                        onSendMessage={
                            sendMessage
                        }
                    />

                </div>


                <MobileRoom
                    remoteVideoRef={
                        remoteMobileVideoRef
                    }
                    localVideoRef={
                        localMobileVideoRef
                    }
                    participantConnected={
                        participantConnected
                    }
                    cameraEnabled={
                        cameraEnabled
                    }
                    user={
                        user
                    }
                    room={
                        room
                    }
                    roomCode={
                        roomCode
                    }
                    activePanel={
                        activePanel
                    }
                    setActivePanel={
                        setActivePanel
                    }
                    messages={
                        messages
                    }
                    message={
                        message
                    }
                    socketId={
                        socket.id
                    }
                    microphoneEnabled={
                        microphoneEnabled
                    }
                    onToggleMicrophone={
                        toggleMicrophone
                    }
                    onToggleCamera={
                        toggleCamera
                    }
                    onMessageChange={
                        setMessage
                    }
                    onSendMessage={
                        sendMessage
                    }
                />

            </main>

        </div>
    );
};


export default Room;
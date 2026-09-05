import React from "react";

import ChatPanel from "./ChatPanel";
import PeoplePanel from "./PeoplePanel";

const MobileRoom = ({
    remoteVideoRef,
    localVideoRef,
    participantConnected,
    cameraEnabled,
    user,
    roomCode,
    activePanel,
    setActivePanel,
    messages,
    message,
    socketId,
    microphoneEnabled,
    onToggleMicrophone,
    onToggleCamera,
    onMessageChange,
    onSendMessage,
}) => {

    const userInitial =
        user?.name?.charAt(0)?.toUpperCase() || "Y";


    return (
        <div className="relative h-full lg:hidden">

            {/* =========================================================
                REMOTE VIDEO
            ========================================================= */}

            <div className="absolute inset-0 bg-black">

                <video
                    ref={remoteVideoRef}
                    autoPlay
                    playsInline
                    className={`h-full w-full object-cover ${
                        participantConnected
                            ? "block"
                            : "hidden"
                    }`}
                />


                {!participantConnected && (

                    <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">

                        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-800 text-2xl font-semibold">
                            ?
                        </div>

                        <p className="text-base font-medium text-gray-300">
                            Waiting for participant
                        </p>

                        <p className="mt-2 max-w-xs text-xs text-gray-500">
                            Share room code {roomCode} with the other participant.
                        </p>

                    </div>

                )}


                <div className="absolute bottom-28 left-4 rounded-lg bg-black/60 px-3 py-2 text-xs backdrop-blur">
                    {participantConnected
                        ? "Participant"
                        : "Waiting..."}
                </div>

            </div>


            {/* =========================================================
                LOCAL VIDEO
            ========================================================= */}

            <div className="absolute right-4 top-4 z-20 h-32 w-24 overflow-hidden rounded-xl border border-white/20 bg-[#151b26] shadow-2xl sm:h-40 sm:w-32">

                <video
                    ref={localVideoRef}
                    autoPlay
                    muted
                    playsInline
                    className={`h-full w-full object-cover ${
                        cameraEnabled
                            ? "block"
                            : "hidden"
                    }`}
                />


                {!cameraEnabled && (

                    <div className="absolute inset-0 flex items-center justify-center bg-[#151b26]">

                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 text-sm font-semibold">
                            {userInitial}
                        </div>

                    </div>

                )}


                <div className="absolute bottom-1 left-1 right-1 rounded bg-black/60 px-1.5 py-1 text-[10px]">
                    You
                </div>

            </div>


            {/* =========================================================
                PANEL
            ========================================================= */}

            {activePanel && (

                <>

                    <button
                        onClick={() => setActivePanel(null)}
                        className="absolute inset-0 z-30 bg-black/50"
                        aria-label="Close panel"
                    />


                    <div className="absolute bottom-0 left-0 right-0 z-40 flex max-h-[70%] flex-col overflow-hidden rounded-t-2xl border-t border-white/10 bg-[#0d111a] shadow-2xl">

                        {/* Handle */}

                        <div className="flex justify-center py-2">

                            <div className="h-1 w-10 rounded-full bg-gray-700" />

                        </div>


                        {/* Tabs */}

                        <div className="flex shrink-0 border-b border-white/10">

                            <button
                                onClick={() =>
                                    setActivePanel("chat")
                                }
                                className={`flex flex-1 items-center justify-center gap-2 py-3 text-sm font-medium ${
                                    activePanel === "chat"
                                        ? "border-b-2 border-blue-500 text-white"
                                        : "text-gray-500"
                                }`}
                            >
                                💬 Chat
                            </button>


                            <button
                                onClick={() =>
                                    setActivePanel("people")
                                }
                                className={`flex flex-1 items-center justify-center gap-2 py-3 text-sm font-medium ${
                                    activePanel === "people"
                                        ? "border-b-2 border-blue-500 text-white"
                                        : "text-gray-500"
                                }`}
                            >
                                👥 People
                            </button>

                        </div>


                        {/* Chat */}

                        {activePanel === "chat" && (

                            <ChatPanel
                                messages={messages}
                                message={message}
                                socketId={socketId}
                                onMessageChange={onMessageChange}
                                onSendMessage={onSendMessage}
                            />

                        )}


                        {/* People */}

                        {activePanel === "people" && (

                            <PeoplePanel
                                user={user}
                                participantConnected={participantConnected}
                            />

                        )}

                    </div>

                </>

            )}


            {/* =========================================================
                CONTROLS
            ========================================================= */}

            <div className="absolute bottom-0 left-0 right-0 z-20 flex h-20 items-center justify-center gap-2 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-3 pt-3 sm:gap-4">

                {/* Mic */}

                <button
                    onClick={onToggleMicrophone}
                    className={`flex h-11 w-11 items-center justify-center rounded-full transition sm:h-12 sm:w-12 ${
                        microphoneEnabled
                            ? "bg-[#1a202c]/90"
                            : "bg-red-600"
                    }`}
                >
                    {microphoneEnabled
                        ? "🎤"
                        : "🔇"}
                </button>


                {/* Camera */}

                <button
                    onClick={onToggleCamera}
                    className={`flex h-11 w-11 items-center justify-center rounded-full transition sm:h-12 sm:w-12 ${
                        cameraEnabled
                            ? "bg-[#1a202c]/90"
                            : "bg-red-600"
                    }`}
                >
                    {cameraEnabled
                        ? "📷"
                        : "🚫"}
                </button>


                {/* Chat */}

                <button
                    onClick={() =>
                        setActivePanel(
                            activePanel === "chat"
                                ? null
                                : "chat"
                        )
                    }
                    className={`relative flex h-11 w-11 items-center justify-center rounded-full transition sm:h-12 sm:w-12 ${
                        activePanel === "chat"
                            ? "bg-blue-600"
                            : "bg-[#1a202c]/90"
                    }`}
                >
                    💬

                    {messages.length > 0 && (

                        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-500 px-1 text-[10px] font-bold">
                            {messages.length > 9
                                ? "9+"
                                : messages.length}
                        </span>

                    )}

                </button>


                {/* People */}

                <button
                    onClick={() =>
                        setActivePanel(
                            activePanel === "people"
                                ? null
                                : "people"
                        )
                    }
                    className={`flex h-11 w-11 items-center justify-center rounded-full transition sm:h-12 sm:w-12 ${
                        activePanel === "people"
                            ? "bg-blue-600"
                            : "bg-[#1a202c]/90"
                    }`}
                >
                    👥
                </button>


                {/* More */}

                <button
                    className="hidden h-11 w-11 items-center justify-center rounded-full bg-[#1a202c]/90 sm:flex sm:h-12 sm:w-12"
                >
                    ⋮
                </button>

            </div>

        </div>
    );
};

export default MobileRoom;
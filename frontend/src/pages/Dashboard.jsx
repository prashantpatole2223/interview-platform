import React, {
    useEffect,
    useState
} from "react";

import {
    Copy,
    Check,
    X,
    Plus,
    LogIn,
    ArrowRight,
    Clock3,
    Radio
} from "lucide-react";

import {
    useNavigate
} from "react-router-dom";

import api from "../services/api";


const Dashboard = () => {

    const navigate =
        useNavigate();


    const [showRoomPopup, setShowRoomPopup] =
        useState(false);

    const [room, setRoom] =
        useState(null);

    const [loading, setLoading] =
        useState(false);

    const [roomsLoading, setRoomsLoading] =
        useState(true);

    const [rooms, setRooms] =
        useState([]);

    const [copied, setCopied] =
        useState("");


    const fetchRooms = async () => {

        try {

            setRoomsLoading(true);

            const response =
                await api.get(
                    "/room/my-rooms"
                );

            const allRooms =
                response.data.data || [];

            const activeRooms =
                allRooms.filter(
                    (item) =>
                        item.status === "waiting" ||
                        item.status === "ongoing"
                );

            setRooms(
                activeRooms
            );

        } catch (error) {

            console.error(
                "Failed to fetch rooms:",
                error
            );

        } finally {

            setRoomsLoading(false);

        }
    };


    useEffect(() => {

        fetchRooms();

    }, []);


    const createRoom = async () => {

        try {

            setLoading(true);

            const response =
                await api.post(
                    "/room/create"
                );

            setRoom(
                response.data
            );

            setShowRoomPopup(
                true
            );

            fetchRooms();

        } catch (error) {

            console.error(
                "Failed to create room:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to create room. Please try again."
            );

        } finally {

            setLoading(false);

        }
    };


    const getInviteLink = () => {

        if (!room?.roomCode) {
            return "";
        }

        return `${window.location.origin}/room/${room.roomCode}`;
    };


    const copyToClipboard = async (
        text,
        type
    ) => {

        try {

            await navigator.clipboard.writeText(
                text
            );

            setCopied(
                type
            );

            setTimeout(
                () => {
                    setCopied("");
                },
                2000
            );

        } catch (error) {

            console.error(
                "Failed to copy:",
                error
            );

        }
    };


    const enterRoom = () => {

        if (!room?.roomCode) {
            return;
        }

        navigate(
            `/room/${room.roomCode}`
        );
    };


    return (
        <div className="min-h-screen bg-slate-50">

            <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">

                <section className="mb-8 rounded-3xl bg-slate-900 p-6 text-white shadow-sm sm:p-8 lg:p-10">

                    <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">

                        <div className="max-w-2xl">

                            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-medium text-slate-200">

                                <span className="h-2 w-2 rounded-full bg-emerald-400" />

                                Interview Platform

                            </div>

                            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">

                                Ready for your next interview?

                            </h1>

                            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">

                                Create an interview room or join an existing session and start collaborating in real time.

                            </p>

                        </div>


                        <button
                            onClick={() =>
                                navigate("/your-rooms")
                            }
                            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15 sm:w-auto"
                        >
                            Your Rooms

                            <ArrowRight
                                size={17}
                            />

                        </button>

                    </div>

                </section>


                <section className="grid gap-5 sm:grid-cols-2">

                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md sm:p-7">

                        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white">

                            <Plus
                                size={22}
                            />

                        </div>

                        <h2 className="text-xl font-bold text-slate-900">
                            Create Room
                        </h2>

                        <p className="mt-2 min-h-[48px] text-sm leading-6 text-slate-500">

                            Start a new interview session and invite another participant using a unique room code.

                        </p>

                        <button
                            onClick={createRoom}
                            disabled={loading}
                            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                        >

                            {loading ? (
                                <>
                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                    Creating Room...
                                </>
                            ) : (
                                <>
                                    Create Room
                                    <ArrowRight size={17} />
                                </>
                            )}

                        </button>

                    </div>


                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md sm:p-7">

                        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-900">

                            <LogIn
                                size={22}
                            />

                        </div>

                        <h2 className="text-xl font-bold text-slate-900">
                            Join Room
                        </h2>

                        <p className="mt-2 min-h-[48px] text-sm leading-6 text-slate-500">

                            Have a room code? Enter it to join an existing interview session.

                        </p>

                        <button
                            onClick={() =>
                                navigate("/join-room")
                            }
                            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                        >
                            Join Room
                            <ArrowRight size={17} />
                        </button>

                    </div>

                </section>


                <section className="mt-10">

                    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

                        <div>

                            <div className="flex items-center gap-2">

                                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                                    Active Rooms
                                </h2>

                                {rooms.length > 0 && (
                                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                                        {rooms.length}
                                    </span>
                                )}

                            </div>

                            <p className="mt-1 text-sm text-slate-500">
                                Your waiting and ongoing interview sessions.
                            </p>

                        </div>


                        <button
                            onClick={() =>
                                navigate("/your-rooms")
                            }
                            className="inline-flex w-fit items-center gap-1 text-sm font-semibold text-slate-700 transition hover:text-slate-950"
                        >
                            View all
                            <ArrowRight
                                size={15}
                            />
                        </button>

                    </div>


                    {roomsLoading ? (

                        <div className="grid gap-5 sm:grid-cols-2">

                            {[1, 2].map(
                                (item) => (

                                    <div
                                        key={item}
                                        className="animate-pulse rounded-2xl border border-slate-200 bg-white p-6"
                                    >

                                        <div className="flex items-center justify-between">

                                            <div>

                                                <div className="h-3 w-20 rounded bg-slate-200" />

                                                <div className="mt-3 h-6 w-28 rounded bg-slate-200" />

                                            </div>

                                            <div className="h-7 w-20 rounded-full bg-slate-200" />

                                        </div>

                                        <div className="mt-6 h-4 w-36 rounded bg-slate-200" />

                                        <div className="mt-5 h-11 rounded-xl bg-slate-200" />

                                    </div>

                                )
                            )}

                        </div>

                    ) : rooms.length === 0 ? (

                        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">

                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">

                                <Clock3
                                    size={22}
                                />

                            </div>

                            <h3 className="mt-4 text-base font-semibold text-slate-900">
                                No active rooms
                            </h3>

                            <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500">
                                Create a room or join an existing interview to get started.
                            </p>

                        </div>

                    ) : (

                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

                            {rooms.map(
                                (item) => (

                                    <div
                                        key={item._id}
                                        className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                                    >

                                        <div className="flex items-start justify-between gap-4">

                                            <div>

                                                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                                                    Room Code
                                                </p>

                                                <p className="mt-1 text-xl font-bold tracking-[0.18em] text-slate-900">
                                                    {item.roomCode}
                                                </p>

                                            </div>


                                            <span
                                                className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                                                    item.status === "waiting"
                                                        ? "bg-amber-50 text-amber-700"
                                                        : "bg-emerald-50 text-emerald-700"
                                                }`}
                                            >

                                                {item.status === "waiting" ? (
                                                    <Clock3 size={13} />
                                                ) : (
                                                    <Radio size={13} />
                                                )}

                                                {item.status}

                                            </span>

                                        </div>


                                        <div className="mt-5 border-t border-slate-100 pt-4">

                                            <p className="text-sm text-slate-500">

                                                Created by{" "}

                                                <span className="font-semibold text-slate-800">

                                                    {item.createdBy?.name ||
                                                        "Unknown"}

                                                </span>

                                            </p>

                                        </div>


                                        <button
                                            onClick={() =>
                                                navigate(
                                                    `/room/${item.roomCode}`
                                                )
                                            }
                                            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                                        >

                                            Enter Room

                                            <ArrowRight
                                                size={16}
                                            />

                                        </button>

                                    </div>

                                )
                            )}

                        </div>

                    )}

                </section>

            </main>


            {showRoomPopup && room && (

                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 py-6 backdrop-blur-sm"
                    onMouseDown={(event) => {

                        if (
                            event.target ===
                            event.currentTarget
                        ) {
                            setShowRoomPopup(false);
                        }

                    }}
                >

                    <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8">

                        <button
                            onClick={() =>
                                setShowRoomPopup(false)
                            }
                            className="absolute right-4 top-4 rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-900"
                            aria-label="Close"
                        >
                            <X
                                size={20}
                            />
                        </button>


                        <div className="pr-8">

                            <div className="mb-1 flex items-center gap-2">

                                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">

                                    <Check
                                        size={19}
                                    />

                                </span>

                                <h2 className="text-2xl font-bold text-slate-900">
                                    Room Created
                                </h2>

                            </div>

                            <p className="mt-3 text-sm leading-6 text-slate-500">
                                Share the room code or invite link with the participant you want to interview.
                            </p>

                        </div>


                        <div className="mt-7">

                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Room Code
                            </label>

                            <div className="flex gap-2">

                                <div className="flex min-w-0 flex-1 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-lg font-bold tracking-[0.2em] text-slate-900 sm:text-xl">

                                    {room.roomCode}

                                </div>

                                <button
                                    onClick={() =>
                                        copyToClipboard(
                                            room.roomCode,
                                            "code"
                                        )
                                    }
                                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-300 text-slate-700 transition hover:bg-slate-50"
                                    aria-label="Copy room code"
                                >

                                    {copied === "code"
                                        ? <Check size={19} />
                                        : <Copy size={19} />
                                    }

                                </button>

                            </div>

                        </div>


                        <div className="mt-5">

                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Invite Link
                            </label>

                            <div className="flex gap-2">

                                <input
                                    value={getInviteLink()}
                                    readOnly
                                    className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 outline-none"
                                />

                                <button
                                    onClick={() =>
                                        copyToClipboard(
                                            getInviteLink(),
                                            "link"
                                        )
                                    }
                                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-300 text-slate-700 transition hover:bg-slate-50"
                                    aria-label="Copy invite link"
                                >

                                    {copied === "link"
                                        ? <Check size={19} />
                                        : <Copy size={19} />
                                    }

                                </button>

                            </div>

                        </div>


                        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row">

                            <button
                                onClick={() =>
                                    setShowRoomPopup(false)
                                }
                                className="flex-1 rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                            >
                                Close
                            </button>


                            <button
                                onClick={enterRoom}
                                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                            >
                                Enter Room
                                <ArrowRight
                                    size={16}
                                />
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
};


export default Dashboard;
import React, {
    useEffect,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    ArrowRight,
    Clock3,
    History,
    DoorOpen,
    Radio,
    Users,
    CalendarDays,
    Mail,
    User,
    LayoutDashboard
} from "lucide-react";

import api from "../services/api";


const statusConfig = {
    waiting: {
        label: "Waiting",
        icon: Clock3,
        className: "bg-amber-50 text-amber-700 ring-1 ring-amber-200"
    },
    ongoing: {
        label: "Ongoing",
        icon: Radio,
        className: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
    },
    ended: {
        label: "Ended",
        icon: History,
        className: "bg-slate-100 text-slate-600 ring-1 ring-slate-200"
    }
};


const RoomCard = ({
    room,
    onEnter,
    onViewDetails
}) => {

    const status =
        statusConfig[room.status] ||
        statusConfig.ended;

    const StatusIcon =
        status.icon;

    const participants =
        room.participantHistory || [];


    return (
        <article className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-6">

            <div className="flex items-start justify-between gap-4">

                <div className="min-w-0">

                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Room Code
                    </p>

                    <h3 className="mt-1 truncate text-xl font-bold tracking-[0.16em] text-slate-900 sm:text-2xl">
                        {room.roomCode}
                    </h3>

                </div>


                <span
                    className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${status.className}`}
                >
                    <StatusIcon size={13} />
                    {status.label}
                </span>

            </div>


            <div className="mt-6 rounded-xl bg-slate-50 p-4">

                <div className="flex items-start gap-3">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-slate-600 shadow-sm ring-1 ring-slate-200">
                        <User size={17} />
                    </div>

                    <div className="min-w-0">

                        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                            Created by
                        </p>

                        <p className="mt-1 truncate text-sm font-semibold text-slate-900">
                            {room.createdBy?.name || "Unknown"}
                        </p>

                        {room.createdBy?.email && (
                            <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">

                                <Mail size={12} />

                                <span className="truncate">
                                    {room.createdBy.email}
                                </span>

                            </div>
                        )}

                    </div>

                </div>

            </div>


            <div className="mt-5 flex items-center justify-between border-b border-slate-100 pb-4">

                <div className="flex items-center gap-2 text-sm text-slate-500">

                    <Users size={16} />

                    <span>
                        {participants.length}{" "}
                        {participants.length === 1
                            ? "participant"
                            : "participants"}
                    </span>

                </div>


                {room.createdAt && (
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">

                        <CalendarDays size={13} />

                        <span>
                            {new Date(
                                room.createdAt
                            ).toLocaleDateString()}
                        </span>

                    </div>
                )}

            </div>


            <div className="mt-5">

                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Participants
                </p>


                {participants.length > 0 ? (

                    <div className="space-y-2">

                        {participants
                            .slice(0, 3)
                            .map(
                                (
                                    participant,
                                    index
                                ) => (

                                    <div
                                        key={`${room._id}-${index}`}
                                        className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5"
                                    >

                                        <div className="flex min-w-0 items-center gap-2.5">

                                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-slate-600 ring-1 ring-slate-200">
                                                {(
                                                    participant.userId?.name ||
                                                    "U"
                                                )
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </div>

                                            <div className="min-w-0">

                                                <p className="truncate text-sm font-medium text-slate-800">
                                                    {participant.userId?.name ||
                                                        "Unknown"}
                                                </p>

                                                <p className="truncate text-xs text-slate-400">
                                                    {participant.role ||
                                                        "Participant"}
                                                </p>

                                            </div>

                                        </div>

                                    </div>

                                )
                            )}

                        {participants.length > 3 && (
                            <p className="pt-1 text-center text-xs font-medium text-slate-400">
                                +{participants.length - 3} more participants
                            </p>
                        )}

                    </div>

                ) : (

                    <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-4 text-center">

                        <p className="text-sm text-slate-400">
                            No participant history
                        </p>

                    </div>

                )}

            </div>


            <div className="mt-auto pt-6">

                {room.status === "ended" ? (

                    <button
                        onClick={() =>
                            onViewDetails(room)
                        }
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50"
                    >
                        View Details
                        <ArrowRight size={16} />
                    </button>

                ) : (

                    <button
                        onClick={() =>
                            onEnter(room)
                        }
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                        <DoorOpen size={16} />
                        Enter Room
                        <ArrowRight size={16} />
                    </button>

                )}

            </div>

        </article>
    );
};


const RoomSection = ({
    title,
    description,
    rooms,
    onEnter,
    onViewDetails,
    emptyMessage,
    icon: Icon
}) => {

    return (
        <section className="mb-12">

            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

                <div className="flex items-start gap-3">

                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-slate-700 shadow-sm ring-1 ring-slate-200">
                        <Icon size={19} />
                    </div>

                    <div>

                        <div className="flex items-center gap-2">

                            <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                                {title}
                            </h2>

                            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                                {rooms.length}
                            </span>

                        </div>

                        <p className="mt-1 text-sm text-slate-500">
                            {description}
                        </p>

                    </div>

                </div>

            </div>


            {rooms.length === 0 ? (

                <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center">

                    <p className="text-sm font-medium text-slate-600">
                        {emptyMessage}
                    </p>

                </div>

            ) : (

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

                    {rooms.map(
                        (room) => (
                            <RoomCard
                                key={room._id}
                                room={room}
                                onEnter={onEnter}
                                onViewDetails={
                                    onViewDetails
                                }
                            />
                        )
                    )}

                </div>

            )}

        </section>
    );
};


const LoadingCard = () => {

    return (
        <div className="animate-pulse rounded-2xl border border-slate-200 bg-white p-6">

            <div className="flex items-start justify-between">

                <div>
                    <div className="h-3 w-20 rounded bg-slate-200" />
                    <div className="mt-3 h-7 w-28 rounded bg-slate-200" />
                </div>

                <div className="h-7 w-20 rounded-full bg-slate-200" />

            </div>

            <div className="mt-6 h-16 rounded-xl bg-slate-100" />

            <div className="mt-5 h-5 w-32 rounded bg-slate-200" />

            <div className="mt-5 h-12 rounded-xl bg-slate-100" />

        </div>
    );
};


const YourRooms = () => {

    const navigate =
        useNavigate();

    const [rooms, setRooms] =
        useState([]);

    const [loading, setLoading] =
        useState(true);


    useEffect(() => {

        const fetchRooms = async () => {

            try {

                const response =
                    await api.get(
                        "/room/my-rooms"
                    );

                setRooms(
                    response.data.data || []
                );

            } catch (error) {

                console.error(
                    "Failed to fetch rooms:",
                    error
                );

                alert(
                    error.response?.data?.message ||
                    "Failed to load rooms."
                );

            } finally {

                setLoading(false);

            }
        };


        fetchRooms();

    }, []);


    const waitingRooms =
        rooms.filter(
            (room) =>
                room.status === "waiting"
        );


    const ongoingRooms =
        rooms.filter(
            (room) =>
                room.status === "ongoing"
        );


    const endedRooms =
        rooms.filter(
            (room) =>
                room.status === "ended"
        );


    const handleEnterRoom = (
        room
    ) => {

        navigate(
            `/room/${room.roomCode}`
        );
    };


    const handleViewDetails = (
        room
    ) => {

        navigate(
            `/history/${room._id}`
        );
    };


    if (loading) {

        return (
            <div className="min-h-screen bg-slate-50">

                <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">

                    <div className="mb-8 animate-pulse">

                        <div className="h-9 w-48 rounded-lg bg-slate-200" />

                        <div className="mt-3 h-5 w-80 max-w-full rounded bg-slate-200" />

                    </div>


                    <div className="mb-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

                        <LoadingCard />
                        <LoadingCard />
                        <LoadingCard />

                    </div>

                </main>

            </div>
        );
    }


    return (
        <div className="min-h-screen bg-slate-50">

            <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">

                <header className="mb-10">

                    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

                        <div>

                            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">

                                <DoorOpen size={14} />

                                Room Management

                            </div>

                            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">

                                Your Rooms

                            </h1>

                            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">

                                Manage your interview rooms, join active sessions, and review completed interviews.

                            </p>

                        </div>


                        <button
                            onClick={() =>
                                navigate(
                                    "/dashboard"
                                )
                            }
                            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 sm:w-auto"
                        >
                            <LayoutDashboard
                                size={16}
                            />
                            Dashboard
                        </button>

                    </div>

                </header>


                {rooms.length === 0 ? (

                    <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm">

                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">

                            <DoorOpen
                                size={25}
                            />

                        </div>

                        <h2 className="mt-5 text-xl font-bold text-slate-900">
                            No rooms yet
                        </h2>

                        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                            Create or join an interview room and your rooms will appear here.
                        </p>

                        <button
                            onClick={() =>
                                navigate(
                                    "/dashboard"
                                )
                            }
                            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                        >
                            Go to Dashboard
                            <ArrowRight
                                size={16}
                            />
                        </button>

                    </div>

                ) : (

                    <>

                        <RoomSection
                            title="Ongoing Rooms"
                            description="Interview sessions that are currently active."
                            rooms={ongoingRooms}
                            onEnter={handleEnterRoom}
                            onViewDetails={
                                handleViewDetails
                            }
                            emptyMessage="You don't have any ongoing rooms."
                            icon={Radio}
                        />


                        <RoomSection
                            title="Waiting Rooms"
                            description="Rooms waiting for another participant to join."
                            rooms={waitingRooms}
                            onEnter={handleEnterRoom}
                            onViewDetails={
                                handleViewDetails
                            }
                            emptyMessage="You don't have any waiting rooms."
                            icon={Clock3}
                        />


                        <RoomSection
                            title="Ended Rooms"
                            description="Completed interview sessions and their details."
                            rooms={endedRooms}
                            onEnter={handleEnterRoom}
                            onViewDetails={
                                handleViewDetails
                            }
                            emptyMessage="You don't have any ended rooms."
                            icon={History}
                        />

                    </>

                )}

            </main>

        </div>
    );
};


export default YourRooms;
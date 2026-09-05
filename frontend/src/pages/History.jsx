import React, {
    useEffect,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    ArrowRight,
    CalendarDays,
    CheckCircle2,
    History as HistoryIcon,
    LayoutDashboard,
    DoorOpen,
    User
} from "lucide-react";

import api from "../services/api";


const History = () => {

    const navigate =
        useNavigate();

    const [rooms, setRooms] =
        useState([]);

    const [loading, setLoading] =
        useState(true);


    useEffect(() => {

        const fetchHistory = async () => {

            try {

                const response =
                    await api.get(
                        "/room/my-rooms"
                    );

                const allRooms =
                    response.data.data || [];

                const endedRooms =
                    allRooms.filter(
                        (room) =>
                            room.status === "ended"
                    );

                setRooms(
                    endedRooms
                );

            } catch (error) {

                console.error(
                    "Failed to fetch history:",
                    error
                );

                alert(
                    error.response?.data?.message ||
                    "Failed to load interview history."
                );

            } finally {

                setLoading(false);

            }
        };


        fetchHistory();

    }, []);


    if (loading) {

        return (
            <div className="min-h-screen bg-slate-50">

                <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">

                    <div className="mb-10 animate-pulse">

                        <div className="h-9 w-56 rounded-lg bg-slate-200" />

                        <div className="mt-3 h-5 w-80 max-w-full rounded bg-slate-200" />

                    </div>


                    <div className="space-y-4">

                        {[1, 2, 3].map(
                            (item) => (

                                <div
                                    key={item}
                                    className="animate-pulse rounded-2xl border border-slate-200 bg-white p-6"
                                >

                                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

                                        <div className="w-full">

                                            <div className="h-3 w-20 rounded bg-slate-200" />

                                            <div className="mt-3 h-6 w-32 rounded bg-slate-200" />

                                            <div className="mt-4 h-4 w-40 rounded bg-slate-200" />

                                            <div className="mt-2 h-4 w-52 rounded bg-slate-200" />

                                        </div>

                                        <div className="h-11 w-full rounded-xl bg-slate-200 sm:w-36" />

                                    </div>

                                </div>

                            )
                        )}

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

                                <HistoryIcon size={14} />

                                Interview Records

                            </div>

                            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">

                                Interview History

                            </h1>

                            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">

                                Review your completed interview sessions and access their details.

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


                <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm font-medium text-slate-500">
                                    Completed Interviews
                                </p>

                                <p className="mt-1 text-3xl font-bold text-slate-900">
                                    {rooms.length}
                                </p>

                            </div>

                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">

                                <CheckCircle2
                                    size={21}
                                />

                            </div>

                        </div>

                    </div>


                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm font-medium text-slate-500">
                                    Status
                                </p>

                                <p className="mt-1 text-lg font-bold text-slate-900">
                                    All Completed
                                </p>

                            </div>

                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-600">

                                <HistoryIcon
                                    size={21}
                                />

                            </div>

                        </div>

                    </div>


                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:col-span-2 lg:col-span-1">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm font-medium text-slate-500">
                                    Room Records
                                </p>

                                <p className="mt-1 text-lg font-bold text-slate-900">
                                    Available to Review
                                </p>

                            </div>

                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-600">

                                <DoorOpen
                                    size={21}
                                />

                            </div>

                        </div>

                    </div>

                </div>


                {rooms.length === 0 ? (

                    <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm">

                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">

                            <HistoryIcon
                                size={25}
                            />

                        </div>

                        <h2 className="mt-5 text-xl font-bold text-slate-900">
                            No interview history
                        </h2>

                        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">

                            Completed interview sessions will appear here once you finish an interview.

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

                    <section>

                        <div className="mb-5 flex items-center justify-between">

                            <div>

                                <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                                    Completed Sessions
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Your previously completed interview rooms.
                                </p>

                            </div>

                            <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                                {rooms.length}{" "}
                                {rooms.length === 1
                                    ? "session"
                                    : "sessions"}
                            </span>

                        </div>


                        <div className="space-y-4">

                            {rooms.map(
                                (room) => (

                                    <article
                                        key={room._id}
                                        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-6"
                                    >

                                        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                                            <div className="min-w-0 flex-1">

                                                <div className="flex flex-wrap items-start gap-4">

                                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white">

                                                        <DoorOpen
                                                            size={20}
                                                        />

                                                    </div>


                                                    <div className="min-w-0">

                                                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                                            Room Code
                                                        </p>

                                                        <h3 className="mt-1 text-xl font-bold tracking-[0.15em] text-slate-900 sm:text-2xl">
                                                            {room.roomCode}
                                                        </h3>

                                                    </div>


                                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">

                                                        <CheckCircle2
                                                            size={13}
                                                        />

                                                        Completed

                                                    </span>

                                                </div>


                                                <div className="mt-5 grid gap-3 border-t border-slate-100 pt-4 sm:grid-cols-2">

                                                    <div className="flex min-w-0 items-center gap-2.5">

                                                        <User
                                                            size={16}
                                                            className="shrink-0 text-slate-400"
                                                        />

                                                        <div className="min-w-0">

                                                            <p className="text-xs text-slate-400">
                                                                Created by
                                                            </p>

                                                            <p className="truncate text-sm font-semibold text-slate-800">
                                                                {room.createdBy?.name ||
                                                                    "Unknown"}
                                                            </p>

                                                        </div>

                                                    </div>


                                                    {room.createdAt && (
                                                        <div className="flex items-center gap-2.5">

                                                            <CalendarDays
                                                                size={16}
                                                                className="shrink-0 text-slate-400"
                                                            />

                                                            <div>

                                                                <p className="text-xs text-slate-400">
                                                                    Created
                                                                </p>

                                                                <p className="text-sm font-medium text-slate-700">
                                                                    {new Date(
                                                                        room.createdAt
                                                                    ).toLocaleString()}
                                                                </p>

                                                            </div>

                                                        </div>
                                                    )}

                                                </div>

                                            </div>


                                            <button
                                                onClick={() =>
                                                    navigate(
                                                        `/history/${room.roomCode}`
                                                    )
                                                }
                                                className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 sm:w-auto"
                                            >

                                                View Details

                                                <ArrowRight
                                                    size={16}
                                                />

                                            </button>

                                        </div>

                                    </article>

                                )
                            )}

                        </div>

                    </section>

                )}

            </main>

        </div>
    );
};


export default History;
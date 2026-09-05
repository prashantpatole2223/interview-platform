import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

const RoomDetails = () => {
    const { roomId } = useParams();
    const navigate = useNavigate();

    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRoomDetails = async () => {
            try {
                const response = await api.get(
                    `/room/${roomId}`
                );

                setRoom(response.data.data);
            } catch (error) {
                console.error(
                    "Failed to fetch room details:",
                    error
                );

                alert(
                    error.response?.data?.message ||
                    "Failed to load room details."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchRoomDetails();
    }, [roomId]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-gray-500">
                    Loading room details...
                </p>
            </div>
        );
    }

    if (!room) {
        return (
            <div className="flex min-h-screen items-center justify-center px-6">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Room Not Found
                    </h1>

                    <p className="mt-2 text-gray-500">
                        This interview room could not be found.
                    </p>

                    <button
                        onClick={() => navigate("/history")}
                        className="mt-6 rounded-xl bg-black px-6 py-3 font-semibold text-white hover:bg-gray-800"
                    >
                        Back to History
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-10">
            <div className="mx-auto max-w-5xl">

                {/* Back */}
                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 text-sm font-semibold text-gray-600 hover:text-black"
                >
                    ← Back
                </button>

                {/* Header */}
                <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">

                        <div>
                            <p className="text-sm text-gray-500">
                                Interview Room
                            </p>

                            <h1 className="mt-1 text-3xl font-bold tracking-widest text-gray-900">
                                {room.roomCode}
                            </h1>
                        </div>

                        <span className="w-fit rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold capitalize text-gray-600">
                            {room.status}
                        </span>
                    </div>
                </div>

                {/* Room Information */}
                <div className="mb-8 grid gap-6 md:grid-cols-2">

                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-bold text-gray-900">
                            Room Information
                        </h2>

                        <div className="mt-5 space-y-4">

                            <div>
                                <p className="text-sm text-gray-500">
                                    Room Code
                                </p>

                                <p className="mt-1 font-semibold text-gray-900">
                                    {room.roomCode}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Status
                                </p>

                                <p className="mt-1 font-semibold capitalize text-gray-900">
                                    {room.status}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Created At
                                </p>

                                <p className="mt-1 font-semibold text-gray-900">
                                    {room.createdAt
                                        ? new Date(
                                            room.createdAt
                                        ).toLocaleString()
                                        : "-"}
                                </p>
                            </div>

                            {room.endedAt && (
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Ended At
                                    </p>

                                    <p className="mt-1 font-semibold text-gray-900">
                                        {new Date(
                                            room.endedAt
                                        ).toLocaleString()}
                                    </p>
                                </div>
                            )}

                        </div>
                    </div>

                    {/* Created By */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-bold text-gray-900">
                            Created By
                        </h2>

                        <div className="mt-5">

                            <p className="text-xl font-semibold text-gray-900">
                                {room.createdBy?.name ||
                                    "Unknown"}
                            </p>

                            <p className="mt-1 text-gray-500">
                                {room.createdBy?.email || ""}
                            </p>

                        </div>
                    </div>
                </div>

                {/* Participants */}
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold text-gray-900">
                            Participants
                        </h2>

                        <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-600">
                            {room.participantHistory?.length || 0}
                        </span>
                    </div>

                    <div className="mt-5 space-y-4">

                        {room.participantHistory?.length ? (
                            room.participantHistory.map(
                                (participant, index) => (
                                    <div
                                        key={`${room._id}-${index}`}
                                        className="rounded-xl border border-gray-100 bg-gray-50 p-4"
                                    >
                                        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

                                            <div>
                                                <p className="font-semibold text-gray-900">
                                                    {participant.userId?.name ||
                                                        "Unknown"}
                                                </p>

                                                <p className="text-sm text-gray-500">
                                                    {participant.userId?.email ||
                                                        ""}
                                                </p>
                                            </div>

                                            <span className="w-fit rounded-full bg-white px-3 py-1 text-xs font-semibold capitalize text-gray-600">
                                                {participant.role}
                                            </span>
                                        </div>

                                        <div className="mt-4 grid gap-3 text-sm md:grid-cols-2">

                                            <div>
                                                <p className="text-gray-400">
                                                    Joined
                                                </p>

                                                <p className="mt-1 font-medium text-gray-700">
                                                    {participant.joinedAt
                                                        ? new Date(
                                                            participant.joinedAt
                                                        ).toLocaleString()
                                                        : "-"}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-gray-400">
                                                    Left
                                                </p>

                                                <p className="mt-1 font-medium text-gray-700">
                                                    {participant.leftAt
                                                        ? new Date(
                                                            participant.leftAt
                                                        ).toLocaleString()
                                                        : "-"}
                                                </p>
                                            </div>

                                        </div>
                                    </div>
                                )
                            )
                        ) : (
                            <p className="py-6 text-center text-gray-500">
                                No participant history available.
                            </p>
                        )}

                    </div>
                </div>

                {/* Action */}
                <div className="mt-8 flex justify-end">

                    <button
                        onClick={() => navigate("/history")}
                        className="rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50"
                    >
                        Back to History
                    </button>

                </div>

            </div>
        </div>
    );
};

export default RoomDetails;
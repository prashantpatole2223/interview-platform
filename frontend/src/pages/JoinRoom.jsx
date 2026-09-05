import React, {
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    ArrowLeft,
    ArrowRight,
    DoorOpen,
    ShieldCheck
} from "lucide-react";

import api from "../services/api";


const JoinRoom = () => {

    const navigate =
        useNavigate();

    const [roomCode, setRoomCode] =
        useState("");

    const [loading, setLoading] =
        useState(false);


    const handleSubmit = async (e) => {

        e.preventDefault();

        const code =
            roomCode.trim().toUpperCase();

        if (!code) {

            alert(
                "Please enter a room code."
            );

            return;
        }

        try {

            setLoading(true);

            await api.post(
                "/room/join",
                {
                    roomCode: code
                }
            );

            navigate(
                `/room/${code}`
            );

        } catch (error) {

            console.error(
                "Failed to join room:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to join room."
            );

        } finally {

            setLoading(false);

        }
    };


    return (
        <div className="min-h-screen bg-slate-50">

            <main className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-8 sm:px-6">

                <div className="w-full max-w-md">

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/dashboard")
                        }
                        className="mb-5 inline-flex items-center gap-2 rounded-lg px-1 py-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
                    >
                        <ArrowLeft size={16} />
                        Back to Dashboard
                    </button>


                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white">

                            <DoorOpen
                                size={22}
                            />

                        </div>


                        <div className="mt-6">

                            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                                Join an Interview
                            </h1>

                            <p className="mt-2 text-sm leading-6 text-slate-500">
                                Enter the room code shared by your interviewer to join the session.
                            </p>

                        </div>


                        <form
                            onSubmit={handleSubmit}
                            className="mt-7"
                        >

                            <label
                                htmlFor="roomCode"
                                className="mb-2 block text-sm font-semibold text-slate-700"
                            >
                                Room Code
                            </label>


                            <input
                                id="roomCode"
                                type="text"
                                value={roomCode}
                                onChange={(e) =>
                                    setRoomCode(
                                        e.target.value
                                            .replace(
                                                /\s/g,
                                                ""
                                            )
                                            .toUpperCase()
                                    )
                                }
                                placeholder="ABC123"
                                maxLength={6}
                                autoComplete="off"
                                autoCapitalize="characters"
                                spellCheck="false"
                                className="h-14 w-full rounded-xl border border-slate-300 bg-white px-4 text-center text-xl font-bold tracking-[0.25em] text-slate-900 outline-none transition placeholder:font-semibold placeholder:tracking-[0.2em] placeholder:text-slate-300 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5"
                            />


                            <p className="mt-2 text-xs text-slate-400">
                                Enter the 6-character room code.
                            </p>


                            <button
                                type="submit"
                                disabled={
                                    loading ||
                                    !roomCode.trim()
                                }
                                className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                            >

                                {loading ? (
                                    <>
                                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                        Joining Room...
                                    </>
                                ) : (
                                    <>
                                        Join Room
                                        <ArrowRight
                                            size={17}
                                        />
                                    </>
                                )}

                            </button>

                        </form>


                        <div className="mt-7 flex items-start gap-3 rounded-xl bg-slate-50 p-4">

                            <ShieldCheck
                                size={18}
                                className="mt-0.5 shrink-0 text-slate-500"
                            />

                            <div>

                                <p className="text-xs font-semibold text-slate-700">
                                    Secure interview session
                                </p>

                                <p className="mt-1 text-xs leading-5 text-slate-500">
                                    Only participants with the valid room code can join the interview.
                                </p>

                            </div>

                        </div>

                    </div>


                    <p className="mt-5 text-center text-xs text-slate-400">
                        Make sure you have the correct room code before joining.
                    </p>

                </div>

            </main>

        </div>
    );
};


export default JoinRoom;
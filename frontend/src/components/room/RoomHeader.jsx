import React from "react";

const RoomHeader = ({
    roomCode,
    participantConnected,
    onLeave,
}) => {
    return (
        <header className="z-30 flex h-16 shrink-0 items-center justify-between border-b border-white/10 bg-[#0d111a] px-4 sm:px-6">

            {/* LEFT */}

            <div className="flex min-w-0 items-center gap-3">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600 font-bold">
                    T
                </div>

                <div className="min-w-0">

                    <h1 className="truncate text-sm font-semibold sm:text-base">
                        Technical Interview
                    </h1>

                    <p className="truncate text-xs text-gray-500">
                        Room #{roomCode}
                    </p>

                </div>

            </div>


            {/* RIGHT */}

            <div className="flex items-center gap-2 sm:gap-4">

                <div className="hidden items-center gap-2 text-xs sm:flex">

                    <span
                        className={`h-2 w-2 rounded-full ${
                            participantConnected
                                ? "bg-green-400"
                                : "bg-yellow-400"
                        }`}
                    />

                    <span className="text-gray-400">
                        {participantConnected
                            ? "Connected"
                            : "Waiting"}
                    </span>

                </div>


                <button
                    onClick={onLeave}
                    className="rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold transition hover:bg-red-700 sm:px-4 sm:text-sm"
                >
                    End
                </button>

            </div>

        </header>
    );
};

export default RoomHeader;
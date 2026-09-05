import React from "react";

const VideoCard = ({
    videoRef,
    participantConnected,
    isLocal = false,
    cameraEnabled = true,
    userName,
}) => {

    const initial =
        userName?.charAt(0)?.toUpperCase() || "Y";


    if (isLocal) {

        return (
            <div className="relative min-h-0 overflow-hidden rounded-2xl border border-white/10 bg-[#111722]">

                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    style={{ transform: "translateZ(0)" }}
                    className={`h-full w-full object-cover ${
                        cameraEnabled
                            ? "block"
                            : "hidden"
                    }`}
                />


                {!cameraEnabled && (

                    <div className="absolute inset-0 flex items-center justify-center">

                        <div className="text-center">

                            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gray-800 text-lg font-semibold">
                                {initial}
                            </div>

                            <p className="text-sm text-gray-400">
                                Camera is off
                            </p>

                        </div>

                    </div>

                )}


                <div className="absolute bottom-4 left-4 rounded-lg bg-black/70 px-3 py-2 text-sm backdrop-blur">

                    {userName || "You"}

                    <span className="ml-1 text-gray-400">
                        (You)
                    </span>

                </div>

            </div>
        );
    }


    return (
        <div className="relative min-h-0 overflow-hidden rounded-2xl border border-white/10 bg-black">

            <video
                ref={videoRef}
                autoPlay
                playsInline
                className={`h-full w-full object-cover ${
                    participantConnected
                        ? "block"
                        : "hidden"
                }`}
            />


            {!participantConnected && (

                <div className="absolute inset-0 flex flex-col items-center justify-center">

                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-800 text-xl font-semibold text-gray-300">
                        ?
                    </div>

                    <p className="text-sm font-medium text-gray-300">
                        Waiting for participant
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                        The other participant will appear here
                    </p>

                </div>

            )}


            <div className="absolute bottom-4 left-4 rounded-lg bg-black/70 px-3 py-2 text-sm backdrop-blur">

                {participantConnected
                    ? "Participant"
                    : "Waiting..."}

            </div>


            {participantConnected && (

                <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 text-xs backdrop-blur">

                    <span className="h-2 w-2 rounded-full bg-green-400" />

                    Live

                </div>

            )}

        </div>
    );
};

export default VideoCard;
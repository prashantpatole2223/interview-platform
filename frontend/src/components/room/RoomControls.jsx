import React from "react";

const RoomControls = ({
    microphoneEnabled,
    cameraEnabled,
    activePanel,
    messagesCount,
    onToggleMicrophone,
    onToggleCamera,
    onToggleChat,
    onTogglePeople,
}) => {
    return (
        <div className="mt-4 flex h-16 shrink-0 items-center justify-center gap-3">

            {/* Microphone */}

            <button
                onClick={onToggleMicrophone}
                title={
                    microphoneEnabled
                        ? "Mute microphone"
                        : "Unmute microphone"
                }
                className={`flex h-11 w-11 items-center justify-center rounded-full transition ${
                    microphoneEnabled
                        ? "bg-[#1a202c] hover:bg-[#252c3a]"
                        : "bg-red-600 hover:bg-red-700"
                }`}
            >
                {microphoneEnabled ? "🎤" : "🔇"}
            </button>


            {/* Camera */}

            <button
                onClick={onToggleCamera}
                title={
                    cameraEnabled
                        ? "Turn camera off"
                        : "Turn camera on"
                }
                className={`flex h-11 w-11 items-center justify-center rounded-full transition ${
                    cameraEnabled
                        ? "bg-[#1a202c] hover:bg-[#252c3a]"
                        : "bg-red-600 hover:bg-red-700"
                }`}
            >
                {cameraEnabled ? "📷" : "🚫"}
            </button>


            {/* Chat */}

            <button
                onClick={onToggleChat}
                className={`relative flex h-11 w-11 items-center justify-center rounded-full transition ${
                    activePanel === "chat"
                        ? "bg-blue-600"
                        : "bg-[#1a202c] hover:bg-[#252c3a]"
                }`}
            >
                💬

                {messagesCount > 0 && (

                    <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-500 px-1 text-[10px] font-bold">
                        {messagesCount > 9
                            ? "9+"
                            : messagesCount}
                    </span>

                )}

            </button>


            {/* People */}

            <button
                onClick={onTogglePeople}
                className={`flex h-11 w-11 items-center justify-center rounded-full transition ${
                    activePanel === "people"
                        ? "bg-blue-600"
                        : "bg-[#1a202c] hover:bg-[#252c3a]"
                }`}
            >
                👥
            </button>


            {/* More */}

            <button
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1a202c] transition hover:bg-[#252c3a]"
            >
                ⋮
            </button>

        </div>
    );
};

export default RoomControls;
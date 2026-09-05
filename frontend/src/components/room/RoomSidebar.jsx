import React from "react";

import ChatPanel from "./ChatPanel";
import PeoplePanel from "./PeoplePanel";


const RoomSidebar = ({
    activePanel,
    setActivePanel,
    messages,
    message,
    socketId,
    user,
    room,
    participantConnected,
    onMessageChange,
    onSendMessage,
}) => {

    return (
        <aside className="flex w-[340px] shrink-0 flex-col border-l border-white/10 bg-[#0d111a] xl:w-[380px]">

            {/* Header */}

            <div className="flex h-14 shrink-0 border-b border-white/10">

                <button
                    onClick={() => setActivePanel("chat")}
                    className={`flex flex-1 items-center justify-center gap-2 border-b-2 text-sm font-medium ${
                        activePanel !== "people"
                            ? "border-blue-500 text-white"
                            : "border-transparent text-gray-500 hover:text-gray-300"
                    }`}
                >
                    💬 Chat

                    {messages.length > 0 && (

                        <span className="rounded-full bg-blue-600 px-1.5 py-0.5 text-[10px]">
                            {messages.length}
                        </span>

                    )}

                </button>


                <button
                    onClick={() => setActivePanel("people")}
                    className={`flex flex-1 items-center justify-center gap-2 border-b-2 text-sm font-medium ${
                        activePanel === "people"
                            ? "border-blue-500 text-white"
                            : "border-transparent text-gray-500 hover:text-gray-300"
                    }`}
                >
                    👥 People
                </button>

            </div>


            {/* Chat */}

            {activePanel !== "people" && (

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
                    room={room}
                    participantConnected={
                        participantConnected
                    }
                />

            )}

        </aside>
    );
};


export default RoomSidebar;
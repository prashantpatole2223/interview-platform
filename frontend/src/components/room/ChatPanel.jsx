import React from "react";

const ChatPanel = ({
    messages,
    message,
    socketId,
    onMessageChange,
    onSendMessage,
}) => {
    return (
        <div className="flex min-h-0 flex-1 flex-col">

            {/* Messages */}

            <div className="min-h-0 flex-1 overflow-y-auto p-4">

                {messages.length === 0 ? (

                    <div className="flex h-full flex-col items-center justify-center text-center">

                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-800">
                            💬
                        </div>

                        <p className="text-sm text-gray-400">
                            No messages yet
                        </p>

                        <p className="mt-1 text-xs text-gray-600">
                            Start the conversation
                        </p>

                    </div>

                ) : (

                    <div className="space-y-4">

                        {messages.map((item, index) => {

                            const isMine =
                                item.socketId === socketId;

                            return (
                                <div
                                    key={`${item.createdAt}-${index}`}
                                    className={`flex ${
                                        isMine
                                            ? "justify-end"
                                            : "justify-start"
                                    }`}
                                >

                                    <div
                                        className={`max-w-[85%] rounded-2xl px-3 py-2.5 ${
                                            isMine
                                                ? "rounded-br-md bg-blue-600"
                                                : "rounded-bl-md bg-[#1a202c]"
                                        }`}
                                    >

                                        {!isMine && (

                                            <p className="mb-1 text-[11px] font-semibold text-blue-400">
                                                Participant
                                            </p>

                                        )}

                                        <p className="break-words text-sm leading-5">
                                            {item.message}
                                        </p>

                                    </div>

                                </div>
                            );
                        })}

                    </div>

                )}

            </div>


            {/* Input */}

            <form
                onSubmit={onSendMessage}
                className="shrink-0 border-t border-white/10 p-3"
            >

                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#151b26] p-1.5">

                    <input
                        type="text"
                        value={message}
                        onChange={(e) =>
                            onMessageChange(e.target.value)
                        }
                        placeholder="Type message..."
                        className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-gray-600"
                    />

                    <button
                        type="submit"
                        disabled={!message.trim()}
                        className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        Send
                    </button>

                </div>

            </form>

        </div>
    );
};

export default ChatPanel;
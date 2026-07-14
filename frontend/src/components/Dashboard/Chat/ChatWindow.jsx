import { FaArrowLeft } from "react-icons/fa";
import { useChannels } from "../../../context/ChannelContext";
import { useMessages } from "../../../context/MessageContext";
import MessageCard from "./MessageCard";
import MessageInput from "./MessageInput";
import { useEffect, useRef } from "react";
import socket from "../../../socket";

const ChatWindow = () => {
    const messagesEndRef = useRef(null);
    const { selectedChannel, setSelectedChannel } = useChannels();
    const { messages, sendMessage } = useMessages();
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages]);
    useEffect(() => {
        if (!selectedChannel) return;

        const join = () => {
            console.log("Joining:", selectedChannel._id);
            socket.emit("joinChannel", selectedChannel._id);
        };

        if (socket.connected) {
            join();
        } else {
            socket.once("connect", join);
        }

        return () => {
            socket.off("connect", join);
        };
    }, [selectedChannel]);

    return (
        <div className="flex flex-col h-full bg-[#313338]">
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-slate-700 px-4 py-3">

                <button
                    onClick={() => setSelectedChannel(null)}
                    className="rounded p-2 hover:bg-slate-700"
                >
                    <FaArrowLeft />
                </button>

                <h2 className="font-semibold text-lg">
                    # {selectedChannel?.name}
                </h2>

            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4">
                {messages.length === 0 ? (
                    <p className="text-gray-400 text-center mt-10">
                        No messages yet.
                    </p>
                ) : (
                    <>
                        {messages.map((message) => (
                            <MessageCard
                                key={message._id}
                                message={message}
                            />
                        ))}

                        <div ref={messagesEndRef} />
                    </>
                )}
            </div>

            {/* Input */}
            <MessageInput onSend={sendMessage} />
        </div>
    );
};

export default ChatWindow;
import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";
import { useChannels } from "./ChannelContext";
import socket from "../socket";

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);


    const { selectedChannel } = useChannels();

    const editMessage = async (id, content) => {
        await api.patch(`/messages/${id}`, { content });
    };

    const deleteMessage = async (id) => {
        await api.delete(`/messages/${id}`);
    };

    const fetchMessages = async () => {
        if (!selectedChannel) {
            setMessages([]);
            return;
        }

        try {
            setLoading(true);
            const { data } = await api.get(
                `/channels/${selectedChannel._id}/messages`
            );
            console.log(data);

            setMessages(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const sendMessage = async ({ content, replyTo, attachments }) => {
        if (!selectedChannel || ((!content || !content.trim()) && (!attachments || attachments.length === 0))) {
            return;
        }
        socket.emit("sendMessage", {
            channelId: selectedChannel._id,
            content,
            replyTo,
            attachments,
        });
    };
    const reactToMessage = async (messageId, emoji) => {
        await api.patch(`/messages/${messageId}/reaction`, {
            emoji
        });
    };


    useEffect(() => {
        console.log("Listening for newMessage");
        socket.on("newMessage", (message) => {
            console.log("Got newMessage:", message);
            setMessages((prev) => [...prev, message]);
        });

        socket.on("reactionUpdated", (updatedMessage) => {
            console.log("Reaction event:", updatedMessage);

            setMessages(prev =>
                prev.map(msg =>
                    msg._id === updatedMessage._id
                        ? updatedMessage
                        : msg
                )
            );
        });

        socket.on("messageEdited", (updatedMessage) => {
            setMessages((prev) =>
                prev.map((msg) =>
                    msg._id === updatedMessage._id
                        ? updatedMessage
                        : msg
                )
            );
        });

        socket.on("messageDeleted", (deletedMessage) => {
            setMessages((prev) =>
                prev.map((msg) =>
                    msg._id === deletedMessage._id
                        ? deletedMessage
                        : msg
                )
            );
        });

        return () => {
            socket.off("newMessage");
            socket.off("reactionUpdated");
            socket.off("messageEdited");
            socket.off("messageDeleted");
        };
    }, []);

    useEffect(() => {
        fetchMessages();
    }, [selectedChannel]);

    return (
        <MessageContext.Provider
            value={{
                messages,
                loading,
                fetchMessages,
                sendMessage,
                deleteMessage,
                editMessage
            }}
        >
            {children}
        </MessageContext.Provider>
    );
};

export const useMessages = () => useContext(MessageContext);
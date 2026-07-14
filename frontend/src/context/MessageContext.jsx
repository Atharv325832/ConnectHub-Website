import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";
import { useChannels } from "./ChannelContext";
import socket from "../socket";

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const { selectedChannel } = useChannels();

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

    const sendMessage = async (content) => {
        if (!selectedChannel || !content.trim()) return;

        try {
            socket.emit("sendMessage", {
                channelId: selectedChannel._id,
                content,
            });
        } catch (err) {
            console.error(err);
        }
    };


    useEffect(() => {
          console.log("Listening for newMessage");
        socket.on("newMessage", (message) => {
              console.log("Got newMessage:", message);
            setMessages((prev) => [...prev, message]);
        });

        return () => {
            socket.off("newMessage");
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
            }}
        >
            {children}
        </MessageContext.Provider>
    );
};

export const useMessages = () => useContext(MessageContext);
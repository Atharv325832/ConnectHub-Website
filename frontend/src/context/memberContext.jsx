import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";
import socket from "../socket";

const MembersContext = createContext();

export const MembersProvider = ({ children }) => {

    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showMembersModal, setShowMembersModal] = useState(false);
    const [onlineUsers, setOnlineUsers] = useState([]);

    const fetchMembers = async (serverId) => {

        try {

            setLoading(true);

            const res = await api.get(`/servers/${serverId}/members`);

            setMembers(res.data);

            setShowMembersModal(true);

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }

    };

    const closeMembersModal = () => {

        setShowMembersModal(false);

    };

    useEffect(() => {
        socket.on("onlineUsers", (users) => {
            setOnlineUsers(users);
        });

        socket.on("userOnline", (userId) => {
            setOnlineUsers((prev) => [...new Set([...prev, userId])]);
        });

        socket.on("userOffline", (userId) => {
            setOnlineUsers((prev) =>
                prev.filter((id) => id !== userId)
            );
        });

        return () => {
            socket.off("onlineUsers");
            socket.off("userOnline");
            socket.off("userOffline");
        };
    }, []);

    return (

        <MembersContext.Provider
            value={{
                members,
                loading,
                showMembersModal,
                fetchMembers,
                closeMembersModal,
                onlineUsers
            }}
        >

            {children}

        </MembersContext.Provider>

    );

};

export const useMembers = () => useContext(MembersContext);
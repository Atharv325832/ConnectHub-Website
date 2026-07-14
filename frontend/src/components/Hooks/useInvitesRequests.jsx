import { useState } from "react";
import api from "../../services/api";

export default function useInviteRequests() {

    const [received, setReceived] = useState([]);
    const [sent, setSent] = useState([]);

    const sendInvite = async (receiverId, serverId) => {
    return await api.post("/invite/send", {
        receiverId,
        serverId,
        type: "server"
    });
        return res.data;
    };

   const fetchReceived = async () => {
    console.log("Fetching received invites...");

    const res = await api.get("/invite/received");

    console.log(res.data);

    setReceived(res.data.invites);
};

    const fetchSent = async () => {
        const res = await api.get("/invite/sent");
        setSent(res.data);
    };

    const acceptInvite = async (id) => {
        await api.post(`/invite/${id}/accept`);
        fetchReceived();
    };

    const rejectInvite = async (id) => {
        await api.post(`/invite/${id}/reject`);
        fetchReceived();
    };

    return {
        received,
        sent,
        sendInvite,
        fetchReceived,
        fetchSent,
        acceptInvite,
        rejectInvite,
    };
}
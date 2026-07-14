import { useState } from "react";
import api from "../../services/api";

export default function useJoinServer(onSuccess) {
    const [inviteCode, setInviteCode] = useState("");
    const [loading, setLoading] = useState(false);

    const joinByCode = async () => {
        if (!inviteCode.trim()) return;
        try {
            setLoading(true);
            const res = await api.post(`/invite/code/${inviteCode}`);

            if (onSuccess) {
                onSuccess(res.data);
            }
            setInviteCode("");
        } catch (err) {
            alert(err.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        inviteCode,
         setInviteCode,
         joinByCode,
        loading
    };
}
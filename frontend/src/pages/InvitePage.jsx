import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

const InvitePage = () => {
    const { code } = useParams();
    const [invite, setInvite] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchInvite();
    }, []);

    const fetchInvite = async () => {
        try {
            const res = await api.get(`/invite/link/${code}`);
            setInvite(res.data.invite);

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const joinServer = async () => {
        try {
            await api.post(`/invite/link/${code}`);
            alert("Joined Successfully");
        } catch (err) {
            alert(err.response?.data?.message);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (!invite) return <div>Invite Not Found</div>;

    return (
        <div className="h-screen flex justify-center items-center bg-[#1e1f22]">
            <div className="bg-[#313338] p-8 rounded-xl w-[420px]">

                <img
                    src={invite.server?.icon || "/default-server.png"}
                    alt={invite.server?.name}
                    className="w-20 h-20 rounded-full mx-auto"
                />

                <h1 className="text-center text-white text-2xl mt-5">
                    You've been invited to join
                </h1>

                <h2 className="text-center text-indigo-400 text-xl mt-2">
                    {invite.server.name}
                </h2>

                <button
                    onClick={joinServer}
                    className="w-full mt-8 bg-indigo-600 py-3 rounded text-white"
                >
                    Join Server
                </button>
            </div>
        </div>
    );
};
export default InvitePage;
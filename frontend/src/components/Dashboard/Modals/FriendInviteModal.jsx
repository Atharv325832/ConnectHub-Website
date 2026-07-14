import { useState } from "react";
import api from "../../../services/api";
import useInviteRequests from "../../Hooks/useInvitesRequests";
import { useServers } from "../../../context/ServerContext";

const FriendInviteModal = ({ onClose }) => {

    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);
    const { selectedServer } = useServers();
    const { sendInvite } = useInviteRequests();

    const handleSearch = async (e) => {

        const value = e.target.value;

        setSearch(value);

        if (!value.trim()) {
            setUsers([]);
            return;
        }

        const res = await api.get(`/users/search?q=${value}`);
        console.log(res.data);
        setUsers(res.data);
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">

            <div className="bg-[#2b2d31] rounded-xl p-6 w-[500px]">

                <h2 className="text-2xl font-bold mb-4">
                    Invite Friends
                </h2>

                <input
                    type="text"
                    placeholder="Search username..."
                    value={search}
                    onChange={handleSearch}
                    className="w-full p-3 rounded bg-[#1e1f22]"
                />

                <div className="mt-4 space-y-3">

                    {users.map((user) => (
                        <div
                            key={user._id}
                            className="flex justify-between items-center"
                        >

                            <span>{user.username}</span>

                            <button
                                onClick={() => sendInvite(user._id, selectedServer._id)}
                                className="bg-indigo-600 px-3 py-1 rounded"
                            >
                                Send
                            </button>

                        </div>
                    ))}

                </div>

                <button
                    onClick={onClose}
                    className="mt-6 w-full bg-red-600 py-2 rounded"
                >
                    Close
                </button>

            </div>

        </div>
    );
};

export default FriendInviteModal;
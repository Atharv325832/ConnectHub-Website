import { useState, useEffect } from "react";
import api from "../services/api";

export default function FriendsPage() {
    const [activeTab, setActiveTab] = useState("friends");
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        try {
            const res = await api.get(`/users/search?q=${query}`);
            setResults(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        const timeout = setTimeout(() => {
            handleSearch();
        }, 300);

        return () => clearTimeout(timeout);
    }, [query]);

    return (
        <div className="h-full bg-[#1e1f22] text-white p-6">

            <div className="flex gap-4 border-b border-gray-700 pb-4">

                <button
                    onClick={() => setActiveTab("friends")}
                    className={`px-4 py-2 rounded-lg ${activeTab === "friends"
                        ? "bg-cyan-500"
                        : "bg-[#2b2d31]"
                        }`}
                >
                    My Friends
                </button>

                <button
                    onClick={() => setActiveTab("requests")}
                    className={`px-4 py-2 rounded-lg ${activeTab === "requests"
                        ? "bg-cyan-500"
                        : "bg-[#2b2d31]"
                        }`}
                >
                    Friend Requests
                </button>

                <button
                    onClick={() => setActiveTab("search")}
                    className={`px-4 py-2 rounded-lg ${activeTab === "search"
                        ? "bg-cyan-500"
                        : "bg-[#2b2d31]"
                        }`}
                >
                    Search Person
                </button>

            </div>

            <div className="mt-6">
                {activeTab === "friends" && <div>Friends List</div>}
                {activeTab === "requests" && <div>Friend Requests</div>}
                {activeTab === "search" && (
                    <div>

                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search users..."
                            className="w-full p-3 rounded bg-[#2b2d31] text-white"
                        />

                        <div className="flex-1 overflow-y-auto">
                            {results.map((user) => (
                                <div
                                    key={user._id}
                                    className="flex justify-between items-center bg-[#2b2d31] p-3 rounded-lg"
                                >
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={user.avatar || "/default-avatar.png"}
                                            alt={user.username}
                                            className="w-10 h-10 rounded-full"
                                        />

                                        <span>{user.username}</span>
                                    </div>

                                    <button className="bg-cyan-500 hover:bg-cyan-600 px-3 py-1 rounded">
                                        Add Friend
                                    </button>
                                </div>
                            ))}
                        </div>

                    </div>
                )}
            </div>

        </div>
    );
}
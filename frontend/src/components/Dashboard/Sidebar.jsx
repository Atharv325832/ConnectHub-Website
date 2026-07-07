import { FaPlus, FaSearch, FaCog } from "react-icons/fa";
import { useServers } from "../../context/ServerContext";
import { useAuth } from "../../context/AuthProvider";

const Sidebar = ({ openModal }) => {
    const { user,logout } = useAuth();
    const {
        servers,
        selectedServer,
        setSelectedServer,
        loading,
    } = useServers();

    return (
        <aside className="w-20 bg-[#18191c] border-r border-[#2b2d31] flex flex-col items-center py-4">

            {/* Logo */}
            <div className="relative group">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500 flex items-center justify-center text-white font-bold text-lg shadow-lg cursor-pointer">
                    CH
                </div>

                <span className="absolute left-16 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-[#2b2d31] px-3 py-2 text-sm text-white opacity-0 group-hover:opacity-100 transition pointer-events-none shadow-lg">
                    {user?.username}
                </span>
            </div>

            {/* Servers */}
            <div className="flex-1 mt-8 flex flex-col items-center gap-4 overflow-y-auto">
                {loading ? (
                    <>
                        {[1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className="w-12 h-12 rounded-2xl bg-[#2b2d31] animate-pulse"
                            />
                        ))}
                    </>
                ) : (
                    servers.map((server) => (
                        <div
                            key={server._id}
                            className="relative group"
                        >
                            <button
                                onClick={() => setSelectedServer(server)}
                                className={`transition-all duration-200 ${
                                    selectedServer?._id === server._id
                                        ? "scale-110"
                                        : "hover:scale-105"
                                }`}
                            >
                                {selectedServer?._id === server._id && (
                                    <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full bg-cyan-400" />
                                )}

                                {server.icon ? (
                                    <img
                                        src={server.icon}
                                        alt={server.name}
                                        className="w-12 h-12 rounded-2xl object-cover border border-[#3a3c43] shadow-md"
                                    />
                                ) : (
                                    <div className="w-12 h-12 rounded-2xl bg-cyan-500 flex items-center justify-center text-white font-bold text-lg">
                                        {server.name.charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </button>

                            <span className="absolute left-16 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-[#2b2d31] px-3 py-1 text-sm text-white opacity-0 group-hover:opacity-100 transition pointer-events-none">
                                {server.name}
                            </span>
                        </div>
                    ))
                )}

                {/* Add Server */}
                <button
                    onClick={openModal}
                    className="w-12 h-12 rounded-2xl bg-[#2b2d31] hover:bg-cyan-500 transition flex items-center justify-center text-white"
                >
                    <FaPlus />
                </button>

                {/* Search / Join */}
                <button className="w-12 h-12 rounded-2xl bg-[#2b2d31] hover:bg-cyan-500 transition flex items-center justify-center text-white">
                    <FaSearch />
                </button>
            </div>

            {/* Bottom */}
            <div className="flex flex-col gap-3">
                <button className="w-12 h-12 rounded-2xl bg-[#2b2d31] hover:bg-cyan-500 transition flex items-center justify-center text-white">
                    <FaCog />
                </button>
            </div>
              <button onClick={logout}
              className="w-full rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-red-600 active:scale-95">
                Logout
            </button>
        </aside>
    );
};

export default Sidebar;
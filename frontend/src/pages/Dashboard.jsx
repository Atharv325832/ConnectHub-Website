import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useServers } from "../context/ServerContext";
import Sidebar from "../components/Dashboard/Sidebar";
import Server from "../components/Dashboard/Server";
import Home from "../components/Dashboard/Home/Home";
import ServerCard from "../components/Dashboard/ServerCard/ServerCard";
import CreateServerModal from "../components/Dashboard/Modals/CreateServerModal";
import ChannelModal from "../components/Dashboard/Modals/ChannelModal";
import InviteModal from "../components/Dashboard/Modals/InviteModal";

const Dashboard = () => {
    const navigate = useNavigate();
    const { logout, user } = useAuth();
    const { selectedServer } = useServers();
    console.log("Selected:", selectedServer);

    const [showModal, setShowModal] = useState(false);
    const [showChannelModal, setShowChannelModal] = useState(false);
    const [showChannels, setShowChannels] = useState(false);
    const [view, setView] = useState("View");
    const [showInviteModal, setShowInviteModal] = useState(false);

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <div className="min-h-100vh flex bg-slate-900 text-white">

            <Sidebar openModal={() => setShowModal(true)} />

            <div className="flex flex-1">
                {showChannels && (
                    <Home
                        channelModal={() => setShowChannelModal(true)}
                        user={user}
                        server={selectedServer}
                        onInvite={() => setShowInviteModal(true)}
                    />
                )}
                <main className="flex-1 flex flex-col">
                    {selectedServer ? (
                        <ServerCard
                            server={selectedServer}
                            onChannelsClick={() => {
                                setShowChannels(true)
                            }}
                            onInvite={() => setShowInviteModal(true)}
                        />
                    ) : (
                        <h2>Select a Server</h2>
                    )}
                </main>
                {showInviteModal && (
                    <InviteModal
                        server={selectedServer}
                        onClose={() => setShowInviteModal(false)}
                    />
                )}

            </div>

            <CreateServerModal
                show={showModal}
                close={() => setShowModal(false)}
            />
            <ChannelModal
                show={showChannelModal}
                close={() => setShowChannelModal(false)}
            />


        </div>
    );
};

export default Dashboard;
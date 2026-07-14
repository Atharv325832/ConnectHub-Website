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
import JoinServer from "../components/Dashboard/JoinServer/JoinServer";
import useJoinServer from "../components/Hooks/useJoinServer";
import MemberModal from "../components/Dashboard/Modals/MemberModal";
import ChatWindow from "../components/Dashboard/Chat/ChatWindow";
import { useChannels } from "../context/ChannelContext";
import { useMembers } from "../context/memberContext";
import HeroSection from "../components/Dashboard/ServerCard/HeroSection";
import FriendInviteModal from "../components/Dashboard/Modals/FriendInviteModal";
import RecievedModal from "../components/Dashboard/Modals/RecievedModal";
import FriendsPage from "./FriendPage";

const Dashboard = () => {
    const navigate = useNavigate();
    const { logout, user } = useAuth();
    const { fetchMembers } = useMembers();
    const { selectedChannel } = useChannels();
    const { selectedServer, fetchServers } = useServers();
    const { inviteCode, setInviteCode, joinByCode, loading } = useJoinServer(fetchServers);
    console.log("Selected:", selectedServer);

    const [showModal, setShowModal] = useState(false);
    const [showFriendModal, setShowFriendModal] = useState(false);
    const [showChannelModal, setShowChannelModal] = useState(false);
    const [showChannels, setShowChannels] = useState(false);
    const [view, setView] = useState("View");
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [RecievedInviteModal, setRecievedInviteModal] = useState(false);
    const [viaCode, setViaCode] = useState(false);

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <div className="h-screen flex bg-slate-900 text-white">

            <Sidebar openModal={() => setShowModal(true)} />

            <div className="flex flex-1">
                <Home
                    channelModal={() => setShowChannelModal(true)}
                    user={user}
                    server={selectedServer}
                    onInvite={() => setShowInviteModal(true)}
                />


                <main className="h-screen flex-1 flex flex-col">

                    {viaCode ? (
                        <JoinServer
                            inviteCode={inviteCode}
                            setInviteCode={setInviteCode}
                            joinByCode={joinByCode}
                            loading={loading}
                            onBack={() => setViaCode(false)}
                        />
                    ) : selectedChannel ? (
                        <ChatWindow />
                    ) : selectedServer ? (
                        <ServerCard
                            server={selectedServer}
                            ChannelModal={() => setShowChannelModal(true)}
                            onFriendInvite={() => setShowFriendModal(true)}
                            onInvite={() => setShowInviteModal(true)}
                            onJoinViaCode={() => setViaCode(true)}
                            onRecievedInvite={() => setRecievedInviteModal(true)}
                        />
                    ) : (
                        <main className="flex-1 overflow-hidden">
                            <FriendsPage />
                        </main>
                    )}

                </main>

                {showFriendModal && (
                    <FriendInviteModal
                        onClose={() => setShowFriendModal(false)}
                    />
                )}
                {showInviteModal && (
                    <InviteModal
                        server={selectedServer}
                        onClose={() => setShowInviteModal(false)}
                    />
                )}
                {RecievedInviteModal && (
                    <RecievedModal
                        onClose={() => setRecievedInviteModal(false)}
                    />
                )

                }

            </div>

            <CreateServerModal
                show={showModal}
                close={() => setShowModal(false)}
            />

            <ChannelModal
                show={showChannelModal}
                close={() => setShowChannelModal(false)}
            />

            <MemberModal />
        </div>
    );
};

export default Dashboard;
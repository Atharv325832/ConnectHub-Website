import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useServers } from "../context/ServerContext";
import Sidebar from "../components/Dashboard/Sidebar";
import Server from "../components/Dashboard/Server";
import Home from "../components/Dashboard/Home";
import ServerCard from "../components/Dashboard/ServerCard/ServerCard";   
import CreateServerModal from "../components/Dashboard/CreateServerModal";

const Dashboard = () => {
    const navigate = useNavigate();
    const {logout } = useAuth();
    const {selectedServer} = useServers();
    console.log("Selected:", selectedServer);

    const [showModal, setShowModal] = useState(false);

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <div className="h-full flex bg-slate-900 text-white">

           <Sidebar openModal={() => setShowModal(true)} />

            <Server user={user} />

            <main className="flex-1 flex flex-col">
             {selectedServer ? (
                  <ServerCard server={selectedServer} />
            ) : (
                <Home user={user} />
            )}

            </main>

            <CreateServerModal
                show={showModal}
                close={() => setShowModal(false)}
            />
        </div>
    );
};

export default Dashboard;
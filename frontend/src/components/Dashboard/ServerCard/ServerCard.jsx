import HeroSection from "./HeroSection";
import Section from "./Section";
import QuickActions from "./QuickActions";
import ActivitySection from "./ActivitySection";
import { useMembers } from "../../../context/memberContext";
import { useServers } from "../../../context/ServerContext";
import { FaArrowLeft } from "react-icons/fa";



const ServerCard = ({  channelModal, onInvite, onJoinViaCode, onFriendInvite, onRecievedInvite }) => {
    const { fetchMembers } = useMembers();
     const { setSelectedServer,selectedServer } = useServers();
    return (

        <div className="flex-1 overflow-y-auto  no-scrollbar bg-[#1e1f22]">
            <div>

                <button
                    onClick={() => setSelectedServer(null)}
                    className="rounded p-2 hover:bg-slate-700"
                >
                    <FaArrowLeft />
                </button>
            </div>

            <HeroSection server={selectedServer} onInvite={onInvite} onJoinViaCode={onJoinViaCode} />

            <div className="px-8 py-6">

                <Section server={selectedServer} fetchMembers={() => fetchMembers(selectedServer._id)} onRecievedInvite={onRecievedInvite} />

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">

                    <div className="xl:col-span-2 space-y-6">

                        <QuickActions
                            channelModal={channelModal}
                            onInviteFriends={onFriendInvite}
                        />
                        <ActivitySection />

                    </div>

                    <div className="space-y-6"></div>
                </div>
            </div>
        </div>
    );
};

export default ServerCard;
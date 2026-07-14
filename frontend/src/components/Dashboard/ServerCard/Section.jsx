import {
    FaUsers,
    FaHashtag,
    FaComments,
    FaRocket
} from "react-icons/fa";
import Stat from "./Stat";
import { useChannels } from "../../../context/ChannelContext";
import { useServers } from "../../../context/ServerContext";

const Section = ({ server, fetchMembers,onRecievedInvite }) => {
    const { channels } = useChannels();
    const { selectedServer, fetchServers } = useServers();
    const stats = [
        {
            title: "Members",
            value: server.members.length,
            icon: <FaUsers />,
            color: "bg-cyan-500",
            onClick:fetchMembers 
        },
        {
            title: "Channels",
            value: channels.length,
            icon: <FaHashtag />,
            color: "bg-green-500",
            onClick:console.log("Hello")
        },
        {
            title: "Messages",
            value: "0",
            icon: <FaComments />,
            color: "bg-orange-500",
            onClick:console.log("Hello")
        },
        {
            title: "Friends",
            value: "0",
            icon: <FaRocket />,
            color: "bg-purple-500",
            onClick: onRecievedInvite
        }
    ];

    return (

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
                <Stat
                    key={stat.title}
                    title={stat.title}
                    value={stat.value}
                    icon={stat.icon}
                    iconBg={stat.color}
                    onClick={stat.onClick}
                />
            ))}
        </div>
    );
};

export default Section;
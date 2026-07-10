import {
    FaUsers,
    FaHashtag,
    FaComments,
    FaRocket
} from "react-icons/fa";
import Stat from "./Stat";
import { useChannels } from "../../../context/ChannelContext";

const Section = ({ server }) => {
    const { channels } = useChannels();
    const stats = [
        {
            title: "Members",
            value: server.members.length,
            icon: <FaUsers />,
            color: "bg-cyan-500"
        },
        {
            title: "Channels",
            value: channels.length,
            icon: <FaHashtag />,
            color: "bg-green-500"
        },
        {
            title: "Messages",
            value: "245",
            icon: <FaComments />,
            color: "bg-orange-500"
        },
        {
            title: "Community",
            value: "Lv.5",
            icon: <FaRocket />,
            color: "bg-purple-500"
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
                />
            ))}
        </div>
    );
};

export default Section;
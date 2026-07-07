import {
    FaUserPlus,
    FaHashtag,
    FaFileUpload,
    FaComments
} from "react-icons/fa";
import ActivityItem from "./ActivityItem";

const ActivitySection = () => {
    const activities = [
        {
            title: "New Member Joined",
            description: "Rahul joined the community.",
            time: "2 min ago",
            icon: <FaUserPlus />,
            color: "bg-cyan-500"
        },
        {
            title: "Channel Created",
            description: "#backend was created.",
            time: "18 min ago",
            icon: <FaHashtag />,
            color: "bg-green-500"
        },
        {
            title: "Files Uploaded",
            description: "Project documentation uploaded.",
            time: "1 hour ago",
            icon: <FaFileUpload />,
            color: "bg-purple-500"
        },
        {
            title: "Conversation Active",
            description: "126 new messages today.",
            time: "Today",
            icon: <FaComments />,
            color: "bg-orange-500"
        }
    ];

    return (
        <div className="rounded-3xl border border-[#3a3c43] bg-[#2b2d31] p-6">

            <div className="mb-6">

                <h2 className="text-2xl font-bold text-white">
                    Recent Activity
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                    Latest updates from your community.
                </p>
            </div>

            <div className="space-y-4">
                {activities.map((activity, index) => (
                    <ActivityItem
                        key={index}
                        title={activity.title}
                        description={activity.description}
                        time={activity.time}
                        icon={activity.icon}
                        color={activity.color}
                    />
                ))}
            </div>
        </div>
    );
};

export default ActivitySection;
import {
    FaUserPlus,
    FaHashtag,
    FaCalendarAlt,
    FaFolderOpen
} from "react-icons/fa";
import { useState } from "react";
import ActionButton from "./ActionButton"

const QuickActions = ({channelModal, onInviteFriends}) => {
    const actions = [
        {
            title: "Invite Friends",
            description: "Grow your community",
            icon: <FaUserPlus />,
            color: "bg-cyan-500",
            onClick: onInviteFriends
        },
        {
            title: "Create Channel",
            description: "Add a new text channel",
            icon: <FaHashtag />,
            color: "bg-green-500",
            onClick: channelModal
        },
        {
            title: "Schedule Event",
            description: "Feature coming soon.",
            icon: <FaCalendarAlt />,
            color: "bg-orange-500",
            onClick: () => console.log("Schedule Event")
        },
        {
            title: "Upload Files",
            // description: "Share documents & media",
            description: "Feature coming soon.",
            icon: <FaFolderOpen />,
            color: "bg-purple-500",
            onClick: () => console.log("Upload Files")
        }
    ];

    return (
        <div className="rounded-3xl bg-[#2b2d31] border border-[#3a3c43] p-6">

            <div className="mb-6 flex items-center justify-between">

                <div>

                    <h2 className="text-2xl font-bold text-white">
                        Quick Actions
                    </h2>

                    <p className="mt-1 text-sm text-slate-400">
                        Common things you can do in this server.
                    </p>
                </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
                {actions.map((action) => (
                    <ActionButton
                        key={action.title}
                        title={action.title}
                        description={action.description}
                        icon={action.icon}
                        color={action.color}
                        onClick={action.onClick}
                    />
                ))}
            </div>
        </div>
    );
};

export default QuickActions;
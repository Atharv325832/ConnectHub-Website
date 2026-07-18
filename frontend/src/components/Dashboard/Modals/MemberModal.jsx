import { useMembers } from "../../../context/memberContext";

const MemberModal = () => {

    const {
        members,
        showMembersModal,
        closeMembersModal,
        onlineUsers
    } = useMembers();

    if (!showMembersModal) return null;

    return (

        <div className="fixed inset-0 bg-black/60 flex justify-center items-center">

            <div className="bg-[#313338] w-[450px] rounded-xl p-6">

                <div className="flex justify-between mb-5">

                    <h2 className="text-white text-xl">

                        Members ({members.length})

                    </h2>

                    <button onClick={closeMembersModal}>

                        ✕

                    </button>

                </div>

                <div className="space-y-3">

                    {members.map(member => (

                        <div
                            key={member._id}
                            className="flex items-center gap-3"
                        >
                            <div
                                className={`w-2 h-2 rounded-full ${onlineUsers.includes(member._id)
                                        ? "bg-green-500"
                                        : "bg-gray-400"
                                    }`}
                            />

                            <img
                                src={member.avatar}
                                className="w-10 h-10 rounded-full"
                            />

                            <div>

                                <p className="text-white">

                                    {member.username}

                                </p>

                                <p className="text-gray-400">

                                    {member.email}

                                </p>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </div>

    );

};

export default MemberModal;
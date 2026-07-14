const JoinServerCard = ({ inviteCode, setInviteCode, joinByCode, loading, onBack }) => {
    return (
        <div className="flex-1 flex items-center justify-center bg-[#1e1f22]">
            <div className="bg-[#313338] p-8 rounded-xl w-[420px]">

                <h2 className="text-2xl text-white font-bold text-center">
                    Join a Server
                </h2>

                <p className="text-gray-400 text-center mt-2">
                    Enter an invite code to join a server.
                </p>

                <input
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value)}
                    placeholder="Invite Code"
                    className="mt-6 w-full bg-[#1e1f22] text-white px-4 py-3 rounded"
                />

                <button
                    disabled={loading}
                    onClick={joinByCode}
                    className="mt-5 w-full bg-indigo-600 py-3 rounded text-white"
                >
                    {loading ? "Joining..." : "Join Server"}
                </button>
                <button
                    onClick={onBack}
                    className="text-gray-400 hover:text-white mb-6"
                >
                     Back
                </button>
            </div>
        </div>
    );

};

export default JoinServerCard;
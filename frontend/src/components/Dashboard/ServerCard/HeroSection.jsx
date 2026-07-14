import { useState } from "react";
import { FaCog, FaUserPlus, FaGlobe, FaEye, FaEyeSlash } from "react-icons/fa";
import InviteModal from "../Modals/InviteModal";

const HeroSection = ({ server, onInvite, onJoinViaCode }) => {
    const [showInviteCode, setShowInviteCode] = useState(false);

    return (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-600 via-blue-700 to-indigo-800">

            {/* Decorative circles */}
            <div className="absolute -top-16 -left-16 h-52 w-52 rounded-full bg-white/10 blur-2xl"></div>
            <div className="absolute -bottom-24 right-0 h-64 w-64 rounded-full bg-black/20 blur-3xl"></div>
            <div className="relative flex flex-col lg:flex-row lg:items-end lg:justify-between px-10 py-10">

                {/* Left */}
                <div className="flex items-end gap-6">

                    {server.icon && (
                        <img
                            src={server.icon}
                            alt={server.name}
                            className="h-28 w-28 rounded-3xl border-4 border-[#1e1f22] object-cover shadow-2xl"
                        />
                    )}
                    <div>

                        <div className="flex items-center gap-2 text-cyan-100 text-sm">
                            <FaGlobe />
                            Public Community
                        </div>

                        <h1 className="mt-2 text-5xl font-bold text-white">
                            {server.name}
                        </h1>

                        <p className="mt-3 text-slate-200">
                            Build. Chat. Collaborate together.
                        </p>

                        <div className="mt-4 inline-flex rounded-xl bg-white/10 px-4 py-2 backdrop-blur">
                            <span className="text-sm text-slate-200">
                                Invite Code :
                            </span>
                            <button
                                onClick={() => { setShowInviteCode(!showInviteCode) }}
                                className="text-sm text-gray-400 p-1"
                            >
                                {showInviteCode ? <FaEyeSlash /> : <FaEye />}
                            </button>

                            {showInviteCode && (
                                <span className="ml-2 font-semibold text-white">
                                    {server.inviteCode}
                                </span>
                            )}

                        </div>
                    </div>
                </div>

                {/* Right */}
                <div className="mt-8 flex gap-4 lg:mt-0">

                    <button onClick={onInvite} className="rounded-xl bg-cyan-400 px-5 py-3 font-medium text-slate-900 transition hover:bg-cyan-300">

                        <div className="flex items-center gap-2">
                            <FaUserPlus />
                            Invite Friends
                        </div>
                    </button>
                    <button onClick={onJoinViaCode} className="rounded-xl bg-cyan-400 px-5 py-3 font-medium text-slate-900 transition hover:bg-cyan-300">

                        <div className="flex items-center gap-2">
                            <FaUserPlus />
                            Join Server via code
                        </div>
                    </button>


                    <button className="rounded-xl bg-white/10 p-4 backdrop-blur transition hover:bg-white/20">
                        <FaCog />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
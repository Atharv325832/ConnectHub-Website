const Server = ({ user }) => {
    return (
        <aside className="w-72 bg-slate-800 flex flex-col">

            <div className="border-b border-slate-700 p-5">

                <h2 className="text-2xl font-bold">
                    ConnectHub
                </h2>

                <p className="text-slate-400 mt-1">
                    Welcome,
                </p>

                <h3 className="text-lg font-semibold text-blue-400">
                    {user?.username}
                </h3>
            </div>

            <div className="flex-1 p-5">

                <p className="uppercase text-xs tracking-widest text-slate-400 mb-3">
                    Channels
                </p>

                <button className="w-full text-left bg-slate-700 rounded-lg px-4 py-3">
                    # General
                </button>
            </div>
        </aside>
    );
};

export default Server;

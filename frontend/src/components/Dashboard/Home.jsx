const Home = ({ user }) => {
    return (
        <>
            <div className="h-16 border-b border-slate-700 flex items-center px-6">

                <h2 className="text-xl font-semibold">
                    # General
                </h2>
            </div>

            <div className="flex-1 p-8">

                <div className="bg-slate-800 rounded-xl p-6">

                    <h2 className="text-2xl font-bold">
                        Welcome , {user?.username} 👋
                    </h2>

                    <p className="text-slate-400 mt-2">
                        Your ConnectHub  is ready.
                    </p>
                </div>
            </div>
        </>
    );
};

export default Home;
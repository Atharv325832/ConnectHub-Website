const UserCard = ({ user, handleLogout }) => {
    return (
        <div className="border-l border-slate-700 p-4 w-72">

            <div className="bg-slate-800 rounded-xl p-4">

                <p className="font-semibold">
                    {user?.username}
                </p>

                <p className="text-sm text-slate-300">
                    {user?.email}
                </p>

                <button
                    onClick={handleLogout}
                    className="mt-4 w-full bg-red-500 hover:bg-red-600 rounded-lg py-2"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default UserCard;
const ActionButton = ({ icon, title, description, color, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="group w-full rounded-2xl border border-[#3a3c43] bg-[#2b2d31] p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500 hover:shadow-xl"
        >
            <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl text-white ${color}`}
            >
                {icon}
            </div>

            <h3 className="mt-5 text-lg font-semibold text-white">
                {title}
            </h3>

            <p className="mt-1 text-sm text-slate-400">
                {description}
            </p>
        </button>
    );
};

export default ActionButton;
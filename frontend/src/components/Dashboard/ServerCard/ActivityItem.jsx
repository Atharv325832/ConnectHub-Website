const ActivityItem = ({ icon, title, description, time, color }) => {
    return (
        <div className="flex items-start gap-4 rounded-2xl bg-[#313338] p-4 transition hover:bg-[#3a3c43]">

            <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-white ${color}`}>
                {icon}
            </div>

            <div className="flex-1">

                <div className="flex items-center justify-between">

                    <h3 className="font-semibold text-white">
                        {title}
                    </h3>

                    <span className="text-xs text-slate-400">
                        {time}
                    </span>
                </div>

                <p className="mt-1 text-sm text-slate-400">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default ActivityItem;
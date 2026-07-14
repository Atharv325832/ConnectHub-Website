const Stat = ({ icon, title, value, iconBg,onClick }) => {
    return (
        <div onClick={onClick} className=" cursor-pointer group rounded-2xl bg-[#2b2d31] p-5 border border-[#3a3c43] transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500 hover:shadow-xl">
      
            <div className="flex items-center justify-between">
         
                <div>

                    <p className="text-3xl font-bold text-white">
                        {value}
                    </p>

                    <p className="mt-1 text-sm text-slate-400">
                        {title}
                    </p>
                </div>
                <div
                    className={`h-14 w-14 rounded-2xl flex items-center justify-center text-2xl text-white ${iconBg}`}>                
                    {icon}
                </div>
            </div>
        </div>
    );
};

export default Stat;
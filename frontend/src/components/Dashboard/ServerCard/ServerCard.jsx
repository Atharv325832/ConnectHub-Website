import HeroSection from "./HeroSection";
import Section from "./Section";
import QuickActions from "./QuickActions";
import ActivitySection from "./ActivitySection";


const ServerCard = ({ server }) => {

    return (

        <div className="flex-1 overflow-y-auto bg-[#1e1f22]">

            <HeroSection server={server} />

            <div className="px-8 py-6">

                <Section server={server} />

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">

                    <div className="xl:col-span-2 space-y-6">

                        <QuickActions />

                        <ActivitySection />

                    </div>

                    <div className="space-y-6"></div>    
                </div>
            </div>
        </div>
    );
};

export default ServerCard;
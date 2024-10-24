import {abbreviateNumber} from "@/lib/utils";

export const Statistics = ({totalVisits, pageViews}) => (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 px-4 gap-6">
        <StatCard title="TOTAL VISITS" value={abbreviateNumber(totalVisits?.length)}/>
        <StatCard title="PAGE VIEWS" value={abbreviateNumber(pageViews?.length)}/>
    </div>
);

const StatCard = ({title, value}) => (
    <div className="bg-black border-white/5 border text-white text-center">
        <p className="text-white/70 font-medium py-8 w-full text-center border-b border-white/5">
            {title}
        </p>
        <p className="py-12 text-3xl lg:text-4xl font-bold bg-[#050505]">
            {value}
        </p>
    </div>
);

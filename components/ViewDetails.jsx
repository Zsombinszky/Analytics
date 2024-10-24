import {abbreviateNumber} from "@/lib/utils";

export const ViewDetails = ({groupedPageViews}) => (
    <div
        className="items-center justify-center grid grid-cols-1 bg-black lg:grid-cols-2 mt-12 w-full border-y border-white/5">
        <TopPages groupedPageViews={groupedPageViews}/>
        <TopVisitSources/>
    </div>
);

const TopPages = ({groupedPageViews}) => (
    <div className="flex flex-col bg-black z-40 h-full w-full">
        <h1 className="label">Top pages</h1>
        {groupedPageViews.map((view) => (
            <div key={view.page}
                 className="text-white w-full items-center justify-between px-6 py-4 border-b border-white/5 flex">
                <p>/{view.page}</p>
                <p>/{abbreviateNumber(view.visits)}</p>
            </div>
        ))}
    </div>
);

const TopVisitSources = () => (
    <div className="flex flex-col bg-black z-40 h-full w-full lg:border-l border-t lg:border-t-0 border-white/5">
        <h1 className="label relative">
            Top Visit Sources
            <p className="absolute bottom-2 right-2 text-[10px] italic font-light">
                add ?utm={"{source}"} to track
            </p>
        </h1>
        {/*{groupedPageSources.map((pageSource) => (*/}
        {/*    <div*/}
        {/*        key={pageSource}*/}
        {/*        className="text-white w-full items-center justify-between px-6 py-4 border-b border-white/5 flex"*/}
        {/*    >*/}
        {/*        <p className="text-white/70 font-light">*/}
        {/*            /{pageSource.source}*/}
        {/*        </p>*/}
        {/*        <p className="text-white/70 font-light">*/}
        {/*            <p className="">*/}
        {/*                {abbreviateNumber(pageSource.visits)}*/}
        {/*            </p>*/}
        {/*        </p>*/}
        {/*    </div>*/}
        {/*))}*/}
    </div>
);

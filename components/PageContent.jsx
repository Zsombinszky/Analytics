import React from 'react'
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Statistics} from "@/components/Statistic";
import {ViewDetails} from "@/components/ViewDetails";

const PageContent = ({totalVisits, pageViews, groupedPageViews}) => (
    <div
        className="z-40 w-[95%] md:w-3/4 lg:w-2/3 min-h-screen py-6 border-x border-white/5 items-center justify-start flex flex-col">
        <div className="w-full items-center justify-center flex">
            <Tabs defaultValue="general" className="w-full items-center justify-center flex flex-col">
                <TabsList className="w-full bg-transparent mb-4 items-start justify-start flex">
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="custom events">Custom Events</TabsTrigger>
                </TabsList>
                <TabsContent className="w-full" value="general">
                    <Statistics totalVisits={totalVisits} pageViews={pageViews}/>
                    <ViewDetails groupedPageViews={groupedPageViews}/>
                </TabsContent>
                <TabsContent value="custom events">Change your password here.</TabsContent>
            </Tabs>
        </div>
    </div>
);

export default PageContent




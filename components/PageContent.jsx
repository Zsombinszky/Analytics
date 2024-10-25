import React from 'react'
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Statistics} from "@/components/Statistic";
import {ViewDetails} from "@/components/ViewDetails";

import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,} from "@/components/ui/carousel"

const formatTimeStamps = (date) => {
    const timestamp = new Date(date)
    return timestamp.toLocaleTimeString()
}

const PageContent = ({
                         totalVisits,
                         pageViews,
                         groupedPageViews,
                         groupedPageSources,
                         groupedCustomEvents,
                         customEvents
                     }) => (
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
                    <ViewDetails groupedPageSources={groupedPageSources} groupedPageViews={groupedPageViews}/>
                </TabsContent>
                <TabsContent value="custom events" className="w-full ">
                    {groupedCustomEvents && (
                        <Carousel className="w-full px-4">
                            <CarouselContent>
                                {Object.entries(groupedCustomEvents).map(
                                    ([eventName, count]) => (
                                        <CarouselItem
                                            key={`${eventName}-${count}`}
                                            className="basis-1/2"
                                        >
                                            <div
                                                className="bg-black smooth group border-white/5 text-white text-center border">
                                                <p
                                                    className="text-white/70 font-medium py-8 w-full border-white/5 smooth text-center border-b"
                                                >
                                                    {eventName}
                                                </p>
                                                <p className="py-12 text-3xl lg:text-4xl font-bold bg-[#050505]">
                                                    {count}
                                                </p>
                                            </div>
                                        </CarouselItem>
                                    )
                                )}
                            </CarouselContent>
                            <CarouselPrevious/>
                            <CarouselNext/>
                        </Carousel>
                    )}
                    <div
                        className="items-center justify-center bg-black mt-12 w-full boder-y border-white/5 relative flex flex-col">
                        {customEvents.map((event) => (
                                <div
                                    className="text-white w-full items-start justify-start px-6 py-12 border-b border-white/5 flex flex-col relative"
                                    key={event}>
                                    <p className="text-white font-light p-3">{event.event_name}</p>
                                    <p>{event.message}</p>
                                    <p className="italic absolute right-2 bottom-2 text-xs text-white/50">{formatTimeStamps(event.timestamp)}</p>
                                </div>
                            )
                        )}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    </div>
);

export default PageContent




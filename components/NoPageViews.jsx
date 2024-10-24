import React from 'react'

const NoPageViews = () => (
    <div className="w-full items-center justify-center flex flex-col space-y-6 z-40 relative min-h-screen px-4">
        <div
            className="z-40 w-full lg:w-2/3 bg-black border border-white/5 py-12 px-8 items-center justify-center flex flex-col text-white space-y-4 relative">
            <p className="bg-green-600 rounded-full p-4 animate-pulse"/>
            <p className="animate-pulse">waiting for the first page view</p>
            <button className="button" onClick={() => window.location.reload()}>refresh</button>
        </div>
    </div>
);
export default NoPageViews

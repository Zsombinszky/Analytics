import React from 'react'
import Header from "@/components/Header";

const LoadingState = () => {
    return (
        <div className="flex flex-col bg-black text-white min-h-screen w-full items-start justify-start">
            <Header/>
            <div className="min-h-screen w-full items-center justify-center flex text-white relative">
                loading...
            </div>
        </div>
    )
}

export default LoadingState

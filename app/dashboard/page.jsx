'use client';
import React, {useEffect, useState, useCallback} from 'react';
import Link from "next/link";
import Header from "@/components/Header";
import useUser from "@/hooks/useUser";
import {redirect} from "next/navigation";
import {supabase} from "@/config/Supabase_Client";

const DashboardPage = () => {
    const [user] = useUser();
    const [websites, setWebsites] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Redirect if user is not authenticated
    useEffect(() => {
        if (!user) return;
        if (user === "no user") redirect("/signin");
    }, [user]);

    const fetchWebsites = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const {data, error} = await supabase
                .from("websites")
                .select()
                .eq("user_id", user.id)  //this is correct!!!
                .order("created_at", {ascending: false});

            setWebsites(data);
        } catch (error) {
            console.error("Error fetching websites:", error);
            setError("Failed to load websites. Please try again later.");
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        if (!user || !supabase) return;
        fetchWebsites().then(() => {
        })
    }, [fetchWebsites, user]);

    return (
        <div className="w-full min-h-screen bg-black flex flex-col justify-center items-center">
            <Header/>
            <div className="w-full items-start justify-start flex flex-col min-h-screen">
                <div className="w-full items-center justify-end flex p-6 border-b border-white/5 z-40">
                    <Link href="/add" prefetch>
                        <button className="button"> + Add Website</button>
                    </Link>
                </div>
                {loading ? (
                    <div className="text-white">
                        Loading...
                    </div>
                ) : error ? (
                    <div className="text-red-600">
                        {error}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-10 p-6 z-40">
                        {websites.map((website) => (
                            <Link key={website.id} href={`/w/${website.website_name}`}>
                                <div
                                    className="border border-white/5 rounded-md py-12 px-6 text-white bg-black w-full cursor-pointer smooth hover:border-white/20 hover:bg-[#050505]">
                                    <h2>
                                        {website.website_name}
                                    </h2>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardPage;

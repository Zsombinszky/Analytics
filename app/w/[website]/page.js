'use client'
import React, {useEffect, useState} from 'react'
import Header from "@/components/Header";
import useUser from "@/hooks/useUser";
import {redirect, useParams} from "next/navigation";
import {supabase} from "@/config/Supabase_Client";
import LoadingState from "@/components/LoadingState";
import NoPageViews from "@/components/NoPageViews";
import PageContent from "@/components/PageContent";


const WebsitePage = () => {
    const [loading, setLoading] = useState(false)
    const [user] = useUser()
    const {website} = useParams()
    const [pageViews, setPageViews] = useState([])
    const [totalVisits, setTotalVisits] = useState([])
    const [groupedPageViews, setGroupedPageViews] = useState([])

    useEffect(() => {
        const validateUserAndFetchData = async () => {
            if (!user) return;
            if (user.role !== "authenticated") {
                redirect("/signin");
            }
            const {data, error} = await supabase.from("websites").select()
                .eq("website_name", website).eq("user_id", user.id);

            if (data.length === 0) {
                redirect("/dashboard");
            }

            //Fetch views after small delay
            setTimeout(fetchViews, 500)
        }

        validateUserAndFetchData();
    }, [user, website]);

    const fetchViews = async () => {
        setLoading(true)
        try {
            const [viewsResponse, visitsResponse] = await Promise.all([
                supabase.from("page_views").select().eq("domain", website),
                supabase.from("visits").select().eq("website_id", website),
            ])

            setPageViews(viewsResponse.data || []);
            setTotalVisits(visitsResponse.data || []);
            setGroupedPageViews(groupPageViews(viewsResponse.data || []));
        } catch (error) {
            console.error("Error fetching views:", error)
        } finally {
            setLoading(false)
        }
    };

    const groupPageViews = (pageViews) => {
        const groupedPageViews = {}
        pageViews.forEach(({page}) => {
            const path = page.replace(/^(?:\/\/|[^/]+)*\//, "")
            groupedPageViews[path] = (groupedPageViews[path] || 0) + 1
        })
        return Object.keys(groupedPageViews).map((page) => ({
            page: page,
            visits: groupedPageViews[page]
        }));
    }

    if (loading) {
        return (
            <LoadingState/>
        )
    }

    return (
        <div className="flex flex-col bg-black text-white min-h-screen w-full items-center justify-center">
            <Header/>

            {pageViews?.length === 0 && !loading ? (
                <NoPageViews/>
            ) : (
                <PageContent
                    totalVisits={totalVisits}
                    pageViews={pageViews}
                    groupedPageViews={groupedPageViews}
                />
            )}
        </div>
    );
}
export default WebsitePage

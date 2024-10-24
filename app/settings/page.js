'use client'
import React, {useEffect, useState} from 'react'
import useUser from "@/hooks/useUser";
import {redirect} from "next/navigation";
import Header from "@/components/Header";
import {supabase} from "@/config/Supabase_Client";
import CodeComp from "@/components/CodeComp";

const SettingsPage = () => {
    const [user] = useUser()
    const [loading, setLoading] = useState(false)
    const [apiKey, setApiKey] = useState("")
    const [error, setError] = useState(null)

    //Redirect if user is not authenticated
    useEffect(() => {
        if (!user) return;
        if (user === "no user") redirect("/signin")
    }, [user]);

    //Fetch the users API key
    const getUserAPI = async () => {
        setLoading(true)
        setError(null)
        try {
            const {data, error} = await supabase.from("users").select().eq("user_id", user.id)
            if (data.length > 0) {
                setApiKey(data[0].api)
            }
        } catch (error) {
            console.error("Error fetching API key:", error)
            setError("Failed to fetch API key. Please try again later.")
        } finally {
            setLoading(false)
        }
    }

    //Generate a new API key
    const generateApiKey = async () => {
        setLoading(true)
        setError(null)
        if (loading || !user) return;
        try {
            const randomString = Math.random().toString(36).substring(2, 300) + Math.random().toString(36).substring(2, 300);
            await supabase.from("users").insert([
                {api: randomString, user_id: user.id}
            ])
            setApiKey(randomString)
        } catch (error) {
            console.error("Error generating API key:", error);
            setError("Failed to generate API key. Please try again later.");
        } finally {
            setLoading(false)
        }
    }

    //Copy API key to clipboard
    const copyApiKey = async () => {
        if (apiKey) {
            await navigator.clipboard.writeText(apiKey)
            alert("API key is copied to the clipboard")
        }
    }

    // Fetch users API key on component mount
    useEffect(() => {
        if (user && supabase) {
            getUserAPI()
        }
    }, [user]);


    //redirecting view
    if (user === "no user") {
        return (
            <div>
                <Header/>
                <div className="min-h-screen items-center justify-center flex flex-col w-full z-40 text-white">
                    Redirecting...
                </div>
            </div>
        )
    }

    return (
        <div className="w-full min-h-screen bg-black items-center justify-center flex flex-col">
            <Header/>
            <div className="min-h-screen items-center justify-center flex flex-col w-full z-40 text-white">
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <>
                        {!apiKey && <button className="button" onClick={generateApiKey}>Generate API Key</button>}
                        {error && <div className="text-red-600">{error}</div>}
                        {apiKey && (
                            <div
                                className="mt-12 border-white/5 border bg-black space-y-12 lg:w-1/2 py-12 w-full md:w-3/4">
                                <div className="space-y-12 px-4">
                                    <p>Your API Key is:</p>
                                    <input readOnly type="text" value={apiKey} disabled className="input-disabled"/>
                                    <button onClick={copyApiKey} className="button">Copy API Key</button>
                                </div>
                                <div className="space-y-4 border-t border-white/5 bg-black p-6">
                                    <h1>You can create custom events using our API like below</h1>
                                    <CodeComp/>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default SettingsPage

'use client'

import React, {useCallback, useEffect} from 'react'
import {supabase} from "@/config/Supabase_Client";
import {useRouter} from "next/navigation";

const SignInPage = () => {
    const router = useRouter();

    //Sign in with Google Oauth
    const signIn = async () => {
        try {
            await supabase.auth.signInWithOAuth({
                provider: "google"
            })
        } catch (error) {
            console.error("Error signing in:", error.message)
        }
    }

    // Check if user already authenticated
    const checkUserAuthStatus = useCallback(async () => {
        try {
            const {data: {user}} = await supabase.auth.getUser();
            if (user && user.role === 'authenticated') {
                router.push("/dashboard");
            }
        } catch (error) {
            console.error("Error fetching user:", error.message)
        }
    }, [router]);

    useEffect(() => {
        if (supabase) {
            checkUserAuthStatus().then(() => {
            })
        }
    }, [checkUserAuthStatus]);

    return (
        <div className="bg-black items-center justify-center flex w-full min-h-screen">
            <button onClick={signIn} className="button flex items-center justify-center space-x-5">
                Sign In with Google
            </button>
        </div>
    )
};

export default SignInPage

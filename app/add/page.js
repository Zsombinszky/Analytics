'use client'
import React, {useEffect, useRef, useState} from 'react'
import Logo from "@/components/Logo";
import {supabase} from "@/config/Supabase_Client";
import useUser from "@/hooks/useUser";
import {useRouter} from "next/navigation";
import ScriptDisplay from "@/components/ScriptDisplay";
import DomainInput from "@/components/DomainInput";

const AddPage = () => {
    const [step, setStep] = useState(1)
    const [website, setWebsite] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [user] = useUser()
    const router = useRouter()
    const [isCopied, setIsCopied] = useState(false)
    const textareaRef = useRef(null);

    const addWebsite = async () => {
        if (website.trim() === "" || loading) {
            return;
        }
        setLoading(true)
        try {
            const {data, error} = await supabase.from("websites").insert([{
                website_name: website.trim(), user_id: user.id
            }]).select()

            setLoading(false)
            setStep(2)
        } catch (e) {
            setLoading(false);
            setError(`Failed to add website: ${e.message}`)
        }
    }

    const checkDomainAddedBefore = async () => {
        setError("");
        const {data: websites, error} = await supabase
            .from("websites")
            .select("*")
            .eq("website_name", website.trim());

        if (error) {
            setError("Error fetching websites");
            return;
        }

        if (websites.length > 0) {
            setError("This domain has been added before");
        } else {
            await addWebsite();
        }
    };


    const copyScript = async () => {
        try {
            if (textareaRef.current) {
                await navigator.clipboard.writeText(textareaRef.current.value);
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 3000)
            }
        } catch (err) {
            console.error("Failed to copy", err)
        }
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            const domainPattern = /^(?!.*:\/\/)(?!.*[:/])^[\w.-]+(\.[a-z]{2,})$/i;
            if (!domainPattern.test(website.trim())) {
                setError("Please enter a valid domain (e.g., google.com)");
            } else {
                setError("");
            }
        }, 500);  // Debounce for 500ms

        return () => clearTimeout(timeout);  // Cleanup
    }, [website]);

    return (
        <div className="flex flex-col w-full min-h-screen bg-black items-center justify-center">
            <Logo size="lg"/>
            <div
                className="container p-12 mt-10 flex flex-col items-center justify-center z-0 border-y border-white/5 bg-black text-white">
                {step === 1 ? (
                    <DomainInput
                        website={website}
                        error={error}
                        setWebsite={setWebsite}
                        checkDomainAddedBefore={checkDomainAddedBefore}
                        loading={loading}
                    />
                ) : (
                    <ScriptDisplay
                        website={website}
                        isCopied={isCopied}
                        copyScript={copyScript}
                        router={router}
                        textareaRef={textareaRef}
                    />
                )}
            </div>
        </div>
    );
}
export default AddPage

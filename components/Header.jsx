import React from 'react'
import Link from "next/link";
import Image from "next/image"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import useUser from "@/hooks/useUser";
import {ArrowRight} from "lucide-react";
import Logo from "@/components/Logo";
import {supabase} from "@/config/Supabase_Client";
import {redirect, usePathname} from "next/navigation";

const Header = () => {
    const [user] = useUser()
    const pathName = usePathname()
    const logOut = async () => {
        await supabase.auth.signOut()
        redirect("/signin")
    }

    if (user === "no user") {
        return <></>
    }

    return (
        <div
            className="flex items-center justify-between px-6 py-3 w-full border-b border-white/5 sticky top-0 bg-black z-50 bg-opacity-20 filter backdrop-blur-lg">
            <Logo size="sm"/>
            <div className="flex space-x-6">
                {pathName !== "/dashboard" && < div className="items-center flex space-x-4">
                    <p className="text-sm text-white/60 hover:text-white smooth">snippet</p>
                    <Link href={"/dashboard"} className="flex items-center justify-center space-x-2 group">
                        <button className="text-sm text-white/60 group-hover:text-white smooth">
                            dashboard
                        </button>
                        <ArrowRight className="h-4 w-full stroke-white/60 group-hover:stroke-white smooth"/>
                    </Link>
                </div>
                }
                <DropdownMenu>
                    <DropdownMenuTrigger
                        className="text-white outline-none p-0 m-0 border-none">
                        <div className="flex space-x-2 items-center justify-center hover:opacity-50">
                            <p className="text-sm">{user && user?.user_metadata.full_name.split(" ")[0]}</p>
                            <Image className="h-8 w-8 rounded-full" src={user && user?.user_metadata.avatar_url}
                                   alt={"user profile picture"} width={32} height={32}/>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="bg-[#0a0a0a] border-white/5 outline-none text-whote bg-opacity-20 backdrop-blur-md filter">
                        <DropdownMenuLabel className="text-white">settings</DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-white/10"/>
                        <Link href="/settings" prefetch>
                            <DropdownMenuItem
                                className="text-white/60 smooth cursor-pointer rounded-md">API</DropdownMenuItem>
                        </Link>
                        <Link href="/settings" prefetch>
                            <DropdownMenuItem
                                className="text-white/60 smooth cursor-pointer rounded-md">Guide</DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator className="bg-white/10"/>
                        <DropdownMenuItem onClick={logOut}
                                          className="text-white/60 smooth cursor-pointer rounded-md">Log
                            out</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}
export default Header

import {NextResponse} from "next/server";
import {supabase} from "@/config/Supabase_Client";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

export async function OPTIONS() {
    return NextResponse.json({}, {headers: corsHeaders})
}

//Error response handler
const errorResponse = (message, status = 400) => {
    return NextResponse.json(
        {error: message}, {status: status, headers: corsHeaders}
    )
}

export async function POST(req) {
    try {
        const {domain, url, event, source} = await req.json();

        //Validate required fields
        if (!domain || !url || !event) {
            return errorResponse("Domain, URL , and event fields must be provided", 400)
        }

        //Check URL match domain
        if (!url.includes(domain)) {
            return errorResponse("The script points to a different domain than the current URL. Please ensure they match.")
        }

        if (event === "session_start") {
            await supabase.from("visits").insert([{website_id: domain, source: source ?? "Direct"}]).select()
        } else if (event === "pageview") {
            await supabase.from("page_views").insert([{domain, page: url}])
        } else {
            return errorResponse("Invalid event type.")
        }

        return NextResponse.json(
            {message: "Success"},
            {status: 200, headers: corsHeaders}
        )
    } catch (error) {
        console.error("Unexpected error:", error)
        return errorResponse(`Unexpected error: ${error.message}`, 500)
    }
}
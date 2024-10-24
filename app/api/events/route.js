import { headers } from "next/headers";
import { supabase } from "@/config/Supabase_Client";
import { NextResponse } from "next/server";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req) {
    try {
        const authHeader = (await headers()).get("authorization");

        // Early return for missing or invalid API key
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json(
                { error: "Unauthorized - Missing or Invalid API key" },
                { status: 401, headers: corsHeaders }
            );
        }

        const apiKey = authHeader.split("Bearer ")[1];
        const { data: users, error: userError } = await supabase
            .from("users")
            .select()
            .eq("api", apiKey);

        // Check if the user exists or there was an error
        if (userError || users.length === 0) {
            return NextResponse.json(
                { error: "Unauthorized - Invalid API key" },
                { status: 401, headers: corsHeaders }
            );
        }

        const { name, domain, description } = await req.json();

        // Validate input fields
        if (!name?.trim() || !domain?.trim()) {
            return NextResponse.json(
                { error: "Name or domain fields must not be empty" },
                { status: 400, headers: corsHeaders }
            );
        }

        const { error: insertError } = await supabase.from("events").insert([
            {
                event_name: name.toLowerCase(),
                website_id: domain,
                message: description || "",
            },
        ]);

        // Handle insertion errors
        if (insertError) {
            return NextResponse.json(
                { error: insertError.message },
                { status: 400, headers: corsHeaders }
            );
        }

        return NextResponse.json(
            { message: "Success" },
            { status: 200, headers: corsHeaders }
        );

    } catch (error) {
        // Handle unexpected errors
        return NextResponse.json(
            { error: error.message },
            { status: 500, headers: corsHeaders }
        );
    }
}

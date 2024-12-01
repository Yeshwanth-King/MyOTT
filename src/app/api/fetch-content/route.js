import { supabase } from "@/app/libs/supbase";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Fetch data from Supabase
        const { data, error } = await supabase.from("movies").select("*");

        // Handle potential errors from Supabase
        if (error) {
            console.error("Error fetching movies:", error.message);
            return NextResponse.json(
                { error: "Failed to fetch movies" },
                { status: 500 }
            );
        }

        // Log and return fetched data
        console.log("Movies fetched:", data);
        return NextResponse.json(data); // Return the fetched movies
    } catch (err) {
        // Handle unexpected errors
        console.error("Unexpected error:", err);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

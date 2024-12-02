import { supabase } from "@/app/libs/supbase";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        // Get search query from the request URL
        const url = new URL(req.url);
        const searchTerm = url.searchParams.get("search");


        // Build the query
        let query = supabase.from("movie").select("*");

        // Apply search filter if a search term is provided
        if (searchTerm) {

            query = query.ilike("title", `%${searchTerm}%`); // Adjust "title" to the column you want to search
        }

        // Fetch data from Supabase
        const { data, error } = await query;

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

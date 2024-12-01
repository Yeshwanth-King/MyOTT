import { supabase } from "@/app/libs/supbase";
import { NextResponse } from "next/server";

export const config = {
    api: {
        bodyParser: false, // Disables Next.js body parser to manually parse the incoming request
    },
};

export async function POST(req) {

    const token = req.headers.get('Authorization')?.split('Bearer ')[1];
    if (!token) {
        return NextResponse.json({ error: "Authorization token is missing" }, { status: 401 });
    }

    const { title, description, image_url, video_url } = await req.json();



    const video_url1 = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/uploads/${video_url}`;
    const image_url1 = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/uploads/${image_url}`;



    const { data: { user } } = await supabase.auth.getUser(token)

    const id = user.id;

    const { error: dbError } = await supabase.from("movie").insert({
        user: id,
        title,
        description,
        image_url: image_url1,
        video_url: video_url1,
    });

    if (dbError) {
        throw new Error("Database insertion failed: " + dbError.message);
    }

    return NextResponse.json({ message: "Content uploaded successfully." });

}

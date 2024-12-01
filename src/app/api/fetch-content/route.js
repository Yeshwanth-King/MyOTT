import { supabase } from "@/app/libs/supbase";
import { NextResponse } from "next/server";

export async function GET(req, res) {


    const { data, error } = await supabase.from("movies").select("*")
    console.log(data)


    return NextResponse.json({ message: "Hello World" });
}
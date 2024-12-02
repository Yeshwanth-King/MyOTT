"use client";
import { supabase } from "../libs/supbase";
import { useEffect, useState } from "react";
import MovieButtons from "./MovieButton";
import { Skeleton } from "@/components/ui/skeleton";

export default function TopMovie() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data: movie, error } = await supabase
          .from("movie")
          .select("*")
          .eq("id", 11)
          .single();
        if (error) throw error;

        setData(movie);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading)
    return (
      <div className="h-[55vh] lg:h-[60vh] w-full flex justify-center items-center">
        <div className="w-full h-full relative">
          <Skeleton className="absolute top-20 left-0 w-full h-full z-50 bg-gray-600" />
          <div className="absolute inset-0 top-20 p-5 z-50">
            <Skeleton className="h-8 w-3/4 mb-4 bg-gray-600" />
            <Skeleton className="h-6 w-full mb-2 bg-gray-600" />
            <Skeleton className="h-6 w-5/6 bg-gray-600" />
          </div>
        </div>
      </div>
    );

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="h-[55vh] lg:h-[60vh] w-full flex justify-start items-center">
      <video
        autoPlay
        muted
        loop
        src={data?.video_url}
        className="w-full absolute top-0 left-0 h-[55vh] lg:h-[60vh] object-cover -z-10 brightness-[60%]"
      ></video>

      <div className="absolute w-[90%] lg:w-[40%] mx-auto sm:mx-2">
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold">
          {data?.title}
        </h1>
        {data?.description && (
          <p className="text-white text-lg mt-5 line-clamp-3">
            {data?.description}
          </p>
        )}
        <div className="flex gap-x-3 mt-4">
          <MovieButtons
            id={data?.id}
            title={data?.title}
            description={data?.description}
            fileUrl={data?.video_url}
          />
        </div>
      </div>
    </div>
  );
}

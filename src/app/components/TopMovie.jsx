"use client";
import { supabase } from "../libs/supbase";
import { useEffect, useState } from "react";
import MovieButtons from "./MovieButton";

// Function to fetch movie data

export default function TopMovie() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data: test, error } = await supabase
          .from("movie")
          .select("*")
          .eq("id", 11)
          .single();
        if (error) throw error;
        console.log(test);

        setData(test);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="h-[55vh] lg:h-[60vh] w-full flex justify-start items-center">
      <video
        autoPlay
        muted
        loop
        src={data?.video_url} // Ensure the video_url is correct
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
          {/* You can re-enable MovieButtons here if needed */}
          <MovieButtons
            title={data?.title}
            description={data?.description}
            fileUrl={data?.video_url}
          />
        </div>
      </div>
    </div>
  );
}

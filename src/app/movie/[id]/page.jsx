"use client";

import MovieButtons from "@/app/components/MovieButton";
import { supabase } from "@/app/libs/supbase";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function MoviePage() {
  const param = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("movie")
        .select("*")
        .eq("id", param.id)
        .single();
      setMovie(data);
    })();
  }, [param.id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <div className="container mx-auto p-6 flex flex-col items-center md:flex-row md:space-x-8">
        {/* Movie Image */}
        <div className="w-full my-10 md:w-1/3 mb-6 md:mb-0">
          <img
            src={movie.image_url} // assuming 'image_url' is a field in your movie data
            alt={movie.title}
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Movie Details */}
        <div className="flex flex-col space-y-6 md:w-2/3">
          <h1 className="text-4xl font-bold">{movie.title}</h1>
          <p className="text-lg text-gray-400">{movie.description}</p>
          <div className="flex flex-col space-y-2">
            <span className="text-lg font-semibold">
              Release Date:{" "}
              {movie.created_at.split("T")[0].split("-").reverse().join("-")}
            </span>
            {/* <span className="text-lg font-semibold">Genre: {movie.genre}</span> */}
            {/* <span className="text-lg font-semibold">
              Rating: {movie.rating}
            </span> */}
          </div>
          {/* Add any other movie details you want to display here */}
          <div className="flex justify-center space-x-4 mt-6">
            {/* <button className="px-6 py-2 bg-red-600 rounded-lg hover:bg-red-500 transition duration-300">
              Watch Trailer
            </button>
            <button className="px-6 py-2 bg-green-600 rounded-lg hover:bg-green-500 transition duration-300">
              Add to Watchlist
            </button> */}
            <MovieButtons
              title={movie?.title}
              description={movie?.description}
              fileUrl={movie?.video_url}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "../libs/supbase";
import Link from "next/link";

async function fetchMovies() {
  // Fetch the latest 4 movies from the "movie" table
  const { data: movies, error } = await supabase
    .from("movie")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(4);

  if (error) {
    console.error("Error fetching movies:", error);
    return [];
  }

  return movies;
}

export default function RecentlyAdded() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchMovies();
      setMovies(data);
    };

    fetchData();
  }, []);

  if (!movies || movies.length === 0) {
    return <p>No movies available at the moment.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8 gap-6">
      {movies.map((movie) => (
        <Link
          href={`/movie/${movie.id}`}
          key={movie.id}
          className="relative h-48 cursor-pointer"
        >
          <Image
            src={movie.image_url}
            alt="Movie"
            width={500}
            height={400}
            className="rounded-sm absolute w-full h-full object-cover"
          />

          <div className="h-60 relative z-10 w-full transform transition duration-500 hover:scale-105 opacity-0 hover:opacity-100">
            <div className="bg-gradient-to-b from-transparent via-black/50 to-black z-10 w-full h-full rounded-lg flex items-center justify-center border">
              <Image
                src={movie.image_url}
                alt="Movie"
                width={800}
                height={800}
                className="absolute w-full h-full -z-10 rounded-lg object-cover"
              />

              <div className="flex flex-col items-center text-center p-4">
                <h2 className="text-white font-bold text-lg">{movie.title}</h2>
                <p className="text-gray-300 text-sm line-clamp-3 mt-2">
                  {movie.description}
                </p>
                <div className="mt-2 flex flex-col items-center">
                  <p className="text-sm text-gray-400">
                    10 | {movie.created_at.split("T")[0]} | 180 mins
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

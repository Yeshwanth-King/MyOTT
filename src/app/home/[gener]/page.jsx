"use client";
import Image from "next/image";
import { MovieCard } from "../../components/MovieCard";
import { supabase } from "../../libs/supbase";
import { useParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

// Initialize Supabase client

async function getData(category, userId) {
  switch (category) {
    case "movies":
      const { data: movies } = await supabase.from("movie").select("*");

      return movies;

    default:
      throw new Error("Invalid category");
  }
}

export default function CategoryPage() {
  const params = useParams();
  const [data, setData] = useState([]);

  (async () => {
    const { data: session } = await supabase.auth.getSession();
    const data = await getData(params.gener, session.session.user.id);
    setData(data);
  })();

  return (
    <div className="text-white">
      <div className="mt-20 mx-9 sm:mx-7">
        <span className="text-6xl capitalize">{params.gener}</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-5 sm:px-0 mt-5 mx-5 gap-6">
        {data.map((movie) => (
          <Link
            href={"/movie/" + movie.id}
            key={movie.id}
            className="relative h-60"
          >
            <Image
              src={movie.image_url}
              alt="Movie"
              width={500}
              height={400}
              className="rounded-sm absolute w-full h-full object-cover"
            />
            <div className="h-60 relative z-10 w-full transform transition duration-500 hover:scale-110 opacity-0 hover:opacity-100">
              <div className="bg-gradient-to-b from-transparent via-black/50 to-black z-10 w-full h-full rounded-lg flex items-center justify-center">
                <Image
                  src={movie.image_url}
                  alt="Movie"
                  width={800}
                  height={800}
                  className="absolute w-full h-full -z-10 rounded-lg object-cover"
                />

                <MovieCard
                  key={movie.id}
                  description={movie.description}
                  title={movie.title}
                  image_url={movie.image_url}
                  video_url={movie.video_url}
                  movieId={movie.id}
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

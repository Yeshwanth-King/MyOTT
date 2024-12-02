"use client";
import Image from "next/image";
import { MovieCard } from "../../components/MovieCard";
import { supabase } from "../../libs/supbase";
import { useParams } from "next/navigation";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { MdDelete } from "react-icons/md";
import { Button } from "@/components/ui/button";

// Initialize Supabase client

export default function CategoryPage() {
  const params = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const skeletonArray = Array.from({ length: 8 }); // Adjust the number for how many skeletons to show

  async function getData(category) {
    switch (category) {
      case "movies":
        const { data: movies } = await supabase.from("movie").select("*");

        return movies;

      case "recently":
        const { data: recent } = await supabase
          .from("movie")
          .select("*")
          .order("created_at", { ascending: false });

        return recent;

      case "list":
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();
        const { data: list } = await supabase
          .from("movie")
          .select("*")
          .eq("user", user.id);
        return list;

      default:
        throw new Error("Invalid category");
    }
  }

  (async () => {
    const { data: session } = await supabase.auth.getSession();
    const data = await getData(params?.gener);
    setData(data);
  })();

  return (
    <div className="text-white">
      <div className="mt-20 mx-9 sm:mx-7">
        <span className="text-6xl capitalize">{params.gener}</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-5 sm:px-0 mt-5 mx-5 gap-6">
        {data.length === 0
          ? skeletonArray.map((_, index) => (
              <div
                key={index}
                className="relative h-60 bg-gray-500 cursor-pointer rounded-sm overflow-hidden"
              >
                <Skeleton className="absolute w-full h-full" />
              </div>
            ))
          : data?.map((movie) => (
              <>
                <Link
                  href={"/movie/" + movie.id}
                  key={movie.id}
                  className="relative h-60 group"
                >
                  <div className="absolute -top-0 group-hover:opacity-0 transition-all duration-500 z-50 left-10">
                    <span className=" text-xl font-bold">{movie.title}</span>
                  </div>
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
              </>
            ))}
      </div>
    </div>
  );
}

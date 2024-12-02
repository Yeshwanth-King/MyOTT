"use client";

import { Input } from "@/components/ui/input";
import axios from "axios";
import { useEffect, useState } from "react";
import { supabase } from "../libs/supbase";
import Link from "next/link";
import { MovieCard } from "../components/MovieCard";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export default function SearchPage() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const skeletonArray = Array.from({ length: 5 }); // Adjust the number for how many skeletons to show

  useEffect(() => {
    setLoading(true);
    (async () => {
      const { data: recent } = await supabase
        .from("movie")
        .select("*")
        .order("created_at", { ascending: false });
      setData(recent);
    })();
    setLoading(false);
  }, []);

  const handleSearch = async (ev) => {
    setLoading(true);
    ev.preventDefault();
    if (search.length === 0) {
      toast.error("Please Enter Something to Search");
      const { data: recent } = await supabase
        .from("movie")
        .select("*")
        .order("created_at", { ascending: false });
      setData(recent);
      setLoading(false);
      return;
    }
    // Redirect to search page with the search query
    const response = await axios.get(
      `/api/fetch-content?search=${encodeURIComponent(search)}`
    );
    if (response.data.error) {
      console.error("Error fetching movies:", response.data.error);
      return;
    }

    setData(response.data);
    setLoading(false);
  };

  return (
    <div className="text-white mt-20">
      <div>
        <h1 className="text-4xl text-center mb-3 font-semibold">Search</h1>
        <div className="max-w-5xl mx-5 sm:mx-auto flex gap-2 justify-center items-center">
          <Input
            value={search}
            onChange={(ev) => {
              setSearch(ev.target.value);
            }}
            type="text"
            className="bg-white text-black"
          />
          <div className="text-end">
            <button
              onClick={handleSearch}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Search
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-5 sm:px-0 mt-5 mx-5 gap-6">
          {loading
            ? skeletonArray.map((_, index) => (
                <div
                  key={index}
                  className="relative h-60 bg-gray-500 cursor-pointer rounded-sm overflow-hidden"
                >
                  <Skeleton className="absolute w-full h-full" />
                </div>
              ))
            : data?.map((movie) => (
                <Link
                  href={"/movie/" + movie.id}
                  key={movie.id}
                  className="relative h-60"
                >
                  {/* <div className="absolute w-full h-full bg-black/10 rounded-lg z-50">
                {movie.title}
              </div> */}
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
          {data.length === 0 && !loading && (
            <div className="text-center text-2xl text-gray-300 w-full">
              No movies found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

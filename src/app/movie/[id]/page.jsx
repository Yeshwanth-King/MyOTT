"use client";

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
  }, []);

  return <div className="text-white">{movie && movie.title}</div>;
}

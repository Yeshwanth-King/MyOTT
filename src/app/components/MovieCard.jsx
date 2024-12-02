"use client";

import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
import PlayVideoModal from "./PlayVideoModal";
import { useState } from "react";

export function MovieCard({
  movieId,
  description,
  title,
  image_url,
  video_url,
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* <button onClick={() => setOpen(true)} className="-mt-14">
        <PlayCircle className="h-20 w-20" />
      </button> */}

      <div className="p-5 absolute bottom-0 left-0">
        <h1 className="font-bold text-lg line-clamp-1">{title}</h1>
        <div className="flex gap-x-2 items-center">
          <p className="font-normal text-sm">2024</p>
          <p className="font-normal border py-0.5 px-1 border-gray-200 rounded text-sm">
            18+
          </p>
          <p className="font-normal text-sm">1h 45m</p>
        </div>
        <p className="line-clamp-1 text-sm text-gray-200 font-light">
          {description}
        </p>
      </div>

      <PlayVideoModal
        fileUrl={video_url}
        key={movieId}
        title={title}
        description={description}
        state={open}
        changeState={setOpen}
      />
    </>
  );
}

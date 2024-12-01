"use client";

import { Button } from "@/components/ui/button";
import { FaRegCirclePlay } from "react-icons/fa6";
import { useState } from "react";
import PlayVideoModal from "./PlayVideoModal"; // Assuming this modal handles video playback.

export default function MovieButtons({ title, description, fileUrl }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Play Button */}
      <Button
        onClick={() => setOpen(true)}
        className="px-6 py-2 bg-red-600 rounded-lg hover:bg-red-500 transition duration-300 text-xl"
      >
        <FaRegCirclePlay className="text-lg" /> Play
      </Button>

      {/* Learn More Button */}
      <Button
        onClick={() => setOpen(true)}
        className="text-lg font-medium bg-white/40 hover:bg-white/30 text-white"
      >
        Learn More
      </Button>

      {/* Video Modal */}
      <PlayVideoModal
        state={open}
        changeState={setOpen}
        title={title}
        description={description}
        fileUrl={fileUrl}
      />
    </>
  );
}

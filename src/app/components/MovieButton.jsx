"use client";

import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
import { useState } from "react";
import PlayVideoModal from "./PlayVideoModal"; // Assuming this modal handles video playback.

export default function MovieButtons({ title, description, fileUrl }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Play Button */}
      <Button onClick={() => setOpen(true)} className="text-lg font-medium">
        <PlayCircle className="mr-2 h-6 w-6" /> Play
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

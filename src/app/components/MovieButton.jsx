"use client";

import { Button } from "@/components/ui/button";
import { FaRegCirclePlay } from "react-icons/fa6";
import { useState } from "react";
import PlayVideoModal from "./PlayVideoModal"; // Assuming this modal handles video playback.
import Link from "next/link";
import { MdInfoOutline } from "react-icons/md";
import { useParams } from "next/navigation";

export default function MovieButtons({ title, id, description, fileUrl }) {
  const [open, setOpen] = useState(false);
  const params = useParams();

  return (
    <>
      {/* Play Button */}
      <div className="flex ">
        <Button
          onClick={() => setOpen(true)}
          className="px-4 py-5  bg-red-600 rounded-lg hover:bg-red-500 transition duration-300 text-xl"
        >
          <div className="flex gap-2 items-center justify-center">
            <FaRegCirclePlay className="text-lg" /> Play
          </div>
        </Button>

        {/* Learn More Button */}
        {params.id ? (
          // <Button
          //   onClick={() => setOpen(true)}
          //   className="text-lg font-medium bg-white/40 hover:bg-white/30 text-white px-4 py-1 rounded-lg ml-3 transition duration-300"
          // >
          //   <div className="flex justify-center items-center gap-2">
          //     <MdInfoOutline className="text-lg" />
          //     Learn More
          //   </div>
          // </Button>
          <></>
        ) : (
          <Link
            href={"/movie/" + id}
            className="text-lg font-medium bg-white/40 hover:bg-white/30 text-white px-4 py-1 rounded-lg ml-3 transition duration-300"
          >
            <div className="flex justify-center items-center gap-2">
              <MdInfoOutline className="text-lg" />
              Learn More
            </div>
          </Link>
        )}
      </div>

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

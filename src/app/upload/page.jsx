"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import back from "@/app/assets/background.jpg";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "../libs/supbase";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { Textarea } from "@/components/ui/textarea";

export default function UploadContent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Dropzone for image
  const {
    getRootProps: getImageRootProps,
    getInputProps: getImageInputProps,
    isDragActive: isImageDragActive,
  } = useDropzone({
    onDrop: (acceptedFiles) => {
      const selectedFile = acceptedFiles[0];
      if (selectedFile && selectedFile.size > 5 * 1024 * 1024) {
        toast.error("Image size must be under 5MB.");
        setError("Image size must be under 5MB.");
        setImageFile(null);
      } else {
        setError("");
        setImageFile(selectedFile);
      }
    },
    accept: "image/*",
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB limit
  });

  // Dropzone for video
  const {
    getRootProps: getVideoRootProps,
    getInputProps: getVideoInputProps,
    isDragActive: isVideoDragActive,
  } = useDropzone({
    onDrop: (acceptedFiles) => {
      const selectedFile = acceptedFiles[0];
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast.error("Video size must be under 10MB.");
      }
      if (selectedFile && selectedFile.size > 10 * 1024 * 1024) {
        toast.error("Video size must be under 10MB.");
        setError("Video size must be under 10MB.");
        setVideoFile(null);
      } else {
        setError("");
        setVideoFile(selectedFile);
      }
    },
    accept: "video/*",
    maxFiles: 1,
    // maxSize: 10 * 1024 * 1024, // 10MB limit
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data: session } = await supabase.auth.getSession();
    const token = session?.session?.access_token;

    if (!title || !description || !imageFile || !videoFile) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    try {
      // Upload image to Supabase storage
      const { data: imageData, error: imageError } = await supabase.storage
        .from("uploads")
        .upload(
          `coverImages/${Date.now()}.${imageFile.name.split(".").pop()}`,
          imageFile
        );
      if (imageError) throw imageError;

      // Upload video to Supabase storage
      const { data: videoData, error: videoError } = await supabase.storage
        .from("uploads")
        .upload(
          `movies/${Date.now()}.${videoFile.name.split(".").pop()}`,
          videoFile
        );
      if (videoError) throw videoError;

      // Save metadata to database
      const data1 = {
        title,
        description,
        image_url: imageData.path,
        video_url: videoData.path,
      };

      const response = await axios.post("/api/upload-content", data1, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.error) {
        toast.error(response.error);
        setError(response.error);
        return;
      }

      toast.success("Content uploaded successfully!");
      setTitle("");
      setDescription("");
      setImageFile(null);
      setVideoFile(null);
    } catch (error) {
      setError(error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${back.src})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
      className="flex flex-col items-center min-h-screen"
    >
      <div className="mx-5 ">
        <Card className="w-full mt-20 max-w-lg sm:mx-auto bg-gray-200 rounded-lg shadow-lg p-8">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-800">
              Upload Content
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label
                  htmlFor="title"
                  className="text-sm font-medium text-gray-700"
                >
                  Title
                </Label>
                <Input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Name of Content"
                  className="mt-2 px-4 py-2 rounded-md shadow-sm border border-gray-600 bg-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <Label
                  htmlFor="description"
                  className="text-sm font-medium text-gray-700"
                >
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter a description"
                  className="mt-2 px-4 py-2 rounded-md shadow-sm border border-gray-600 bg-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Image Dropzone */}
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Drag and Drop Image (Image only, max 5MB)
                </Label>
                <div
                  {...getImageRootProps()}
                  className={`mt-2 px-4 py-6 rounded-md border-dashed border-2 border-gray-600 bg-gray-100 text-gray-800 cursor-pointer ${
                    isImageDragActive ? "bg-gray-300" : ""
                  }`}
                >
                  <input {...getImageInputProps()} />
                  {isImageDragActive ? (
                    <p>Drop the image here...</p>
                  ) : imageFile ? (
                    <p>{imageFile.name}</p>
                  ) : (
                    <p>Drag & drop an image here, or click to select one</p>
                  )}
                </div>
              </div>

              {/* Video Dropzone */}
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Drag and Drop Video (Video only, max 10MB)
                </Label>
                <div
                  {...getVideoRootProps()}
                  className={`mt-2 px-4 py-6 rounded-md border-dashed border-2 border-gray-600 bg-gray-100 text-gray-800 cursor-pointer ${
                    isVideoDragActive ? "bg-gray-300" : ""
                  }`}
                >
                  <input {...getVideoInputProps()} />
                  {isVideoDragActive ? (
                    <p>Drop the video here...</p>
                  ) : videoFile ? (
                    <p>{videoFile.name}</p>
                  ) : (
                    <p>Drag & drop a video here, or click to select one</p>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full mt-4 py-2 rounded-md bg-indigo-600 text-white font-semibold disabled:bg-gray-500"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" />
                    Uploading...
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
              {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

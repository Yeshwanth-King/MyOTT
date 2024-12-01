"use client";

import axios from "axios";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import back from "@/app/assets/background.jpg";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import Navbar from "../components/NavBar";
import { toast } from "sonner";
import { supabase } from "../libs/supbase";

export default function UploadContent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size > 10 * 1024 * 1024) {
      setError("File size must be under 10MB.");
      setFile(null);
    } else {
      setError("");
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data: session, error } = await supabase.auth.getSession();
    const token = session.session.access_token;
    if (!title || !description || !file) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    try {
      console.log(file);
      const { data, error: fileError } = await supabase.storage
        .from("uploads")
        .upload(`movies/${Date.now()}.${file.name.split(".")[1]}`, file);
      if (fileError) throw fileError;
      console.log(data.fullPath);

      const data1 = { title, description, file_url: data.path };
      const response = await axios.post("/api/upload-content", data1, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.error) {
        toast.error(response.data.error);
        setError(response.data.error);
        return;
      }

      toast.success("Content uploaded successfully!");
      setTitle("");
      setDescription("");
      setFile(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${back.src})`, // Black overlay with 50% opacity
        backgroundSize: "cover", // Ensure the image covers the entire area
        backgroundRepeat: "no-repeat", // Avoid repetition
        backgroundPosition: "center", // Center the image
      }}
      className="flex flex-col items-center  min-h-screen"
    >
      <Navbar />
      <div className="mx-5 mt-20">
        <Card className="w-full max-w-lg  sm:mx-auto bg-zinc-800 rounded-lg shadow-lg p-6">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-white">
              Upload Content
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label
                  htmlFor="title"
                  className="text-sm font-medium text-gray-300"
                >
                  Title
                </Label>
                <Input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Name of Movie"
                  className="mt-2 px-4 py-2 rounded-md border border-gray-600 bg-white  focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <Label
                  htmlFor="description"
                  className="text-sm font-medium text-gray-300"
                >
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter a description"
                  className="mt-2 px-4 py-2 rounded-md border border-gray-600 bg-white  focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <Label
                  htmlFor="file"
                  className="text-sm font-medium text-gray-300"
                >
                  Upload File (Video only, max 10MB)
                </Label>
                <Input
                  type="file"
                  id="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="mt-2 px-4 py-2 cursor-pointer rounded-md border border-gray-600 bg-white text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-300 ease-in-out"
                  aria-label="Upload video file"
                />
              </div>
              <Button
                type="submit"
                className="w-full mt-4 py-2 rounded-md bg-indigo-600 text-white font-semibold disabled:bg-gray-500"
                disabled={loading}
                variant="contained"
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
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import { supabase } from "../libs/supbase";

const MovieCard = ({ movie, onEdit, onDelete }) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-md w-64">
      <img
        src={movie.image_url}
        alt={movie.title}
        className="h-40 w-full object-cover rounded-md"
      />
      <h2 className="mt-2 text-lg font-semibold">{movie.title}</h2>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => onEdit(movie)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(movie.id)}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

const MoviesList = () => {
  const [movies, setMovies] = useState([]);

  // Fetch movies from Supabase
  const fetchMovies = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from("movie")
      .select("*")
      .eq("user", user.id);
    if (error) console.error(error);
    else setMovies(data);
  };

  // Handle edit
  const handleEdit = (movie) => {
    // Logic to open an edit modal/form
    console.log("Edit movie:", movie);
  };

  // Handle delete
  const handleDelete = async (id) => {
    const { error } = await supabase.from("movie").delete().eq("id", id);
    if (error) console.error(error);
    else {
      setMovies((prev) => prev.filter((movie) => movie.id !== id));
    }
  };

  // Fetch movies on mount
  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    // <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default MoviesList;

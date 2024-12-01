"use client";
import React, { useEffect } from "react";
import TopMovie from "../components/TopMovie";
import RecentlyAdded from "../components/RecentlyAdded";
import { useRouter } from "next/navigation";
import { supabase } from "../libs/supbase";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!data.user) {
        router.push("/auth");
      }
    })();
  }, []);
  return (
    <div>
      <div className="p-6 lg:p-0">
        <TopMovie />
        <h1 className="text-3xl font-bold text-white">Recently Added</h1>
        <RecentlyAdded />
      </div>
    </div>
  );
};

export default Home;

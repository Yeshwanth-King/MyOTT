"use client";
import React, { useEffect, useState } from "react";
import TopMovie from "../components/TopMovie";
import RecentlyAdded from "../components/RecentlyAdded";
import { useRouter } from "next/navigation";
import { supabase } from "../libs/supbase";

const Home = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data, error } = await supabase.auth.getUser();
      if (!data.user) {
        router.push("/auth");
      }
      setLoading(false);
    })();
  }, []);
  return (
    <div>
      <div className="p-6 lg:p-0">
        <TopMovie />
        {!loading && (
          <h1 className="text-3xl font-bold text-white">Recently Added</h1>
        )}
        <RecentlyAdded />
      </div>
    </div>
  );
};

export default Home;

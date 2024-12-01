"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "./libs/supbase";

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.auth.getUser();
      console.log(data);
      setUser(data.user);
    })();
  }, []);
  if (!user) {
    return <>please Login</>;
  }

  return <div className="bg-black min-h-screen"></div>;
}

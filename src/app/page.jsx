"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "./libs/supbase";
import { useRouter } from "next/navigation";

export default function Home() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!data.user) {
        router.push("/auth");
      } else {
        router.push("/home");
      }
    })();
  }, []);

  return <div></div>;
}

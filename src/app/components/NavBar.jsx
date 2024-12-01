"use client";

import Image from "next/image";
import Link from "next/link";
// import Logo from "../../public/netflix_logo.svg";
import { GoBell, GoSearch } from "react-icons/go";
import { usePathname, useRouter } from "next/navigation";
import UserNav from "../components/UserNav";
import Logo from "../assets/logo.svg";
import { useEffect, useState } from "react";
import { supabase } from "../libs/supbase";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const pathName = usePathname();
  const router = useRouter();

  const [user, setUser] = useState(null);
  useEffect(() => {
    (async () => {
      const { data: userData } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from("user")
        .select("*")
        .eq("id", userData.user.id)
        .single();

      if (error) {
        console.log(error.message);

        toast.error(error.message);
      }
      setUser(data);
    })();
  }, []);

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      toast.success("Logged out");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const links = [
    { name: "Home", href: "/home" },
    { name: "Tv Shows", href: "/home/shows" },
    { name: "Movies", href: "/home/movies" },
    { name: "Recently Added", href: "/home/recently" },
    { name: "My List", href: "/home/user/list" },
  ];

  return (
    <div className="w-full  absolute top-0 z-10  mx-auto items-center justify-between px-5 sm:px-6 py-5 lg:px-8 flex">
      <div className="flex items-center">
        <Link href="/home" className="w-32">
          <Image src={Logo} alt="Netflix logo" priority />
        </Link>
        <ul className="lg:flex gap-x-4 ml-14 hidden">
          {links.map((link, idx) => (
            <div key={idx}>
              {pathName === link.href ? (
                <li>
                  <Link
                    href={link.href}
                    className="text-white font-semibold underline text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ) : (
                <li>
                  <Link
                    className="text-gray-300 font-normal text-sm"
                    href={link.href}
                  >
                    {link.name}
                  </Link>
                </li>
              )}
            </div>
          ))}
        </ul>
      </div>

      <div className="flex items-center gap-x-4 sm:gap-x-8">
        {user && (
          <>
            <div>
              <Button
                onClick={(ev) => {
                  ev.preventDefault();
                  router.push("/upload");
                }}
                className=""
              >
                Upload
              </Button>
            </div>
          </>
        )}
        <GoSearch className="w-5 h-5 text-gray-300 cursor-pointer" />
        <GoBell className="h-5 w-5 text-gray-300 cursor-pointer" />
        <UserNav user={user} signOut={signOut} />
      </div>
    </div>
  );
}
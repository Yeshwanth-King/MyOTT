"use client";

import Image from "next/image";
import Link from "next/link";
import { GoBell, GoSearch } from "react-icons/go";
import { usePathname, useRouter } from "next/navigation";
import UserNav from "../components/UserNav";
import Logo from "../assets/logo.svg";
import { useEffect, useState } from "react";
import { supabase } from "../libs/supbase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi"; // Import icons for toggle

export default function Navbar({ links }) {
  const pathName = usePathname();
  console.log(pathName);
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false); // State to handle mobile menu visibility

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
      toast.success("Logged out");
      setUser(null);
      router.push("/auth");
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (pathName.includes("auth")) return null;

  return (
    <div className="w-full absolute top-0 z-10 mx-auto items-center justify-between px-5 sm:px-6 py-5 lg:px-8 flex">
      <div className="flex items-center">
        <Link href="/home" className="w-32">
          <Image src={Logo} alt="Logo" priority />
        </Link>
        {/* Desktop Navigation */}
        <ul className="md:flex gap-x-4 ml-14 hidden">
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

      {/* Mobile Menu Toggle */}
      <div className="md:hidden flex items-center">
        <Button
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          // className="text-gray-300 focus:outline-none"
        >
          {isMobileMenuOpen ? (
            <HiOutlineX className="w-6 h-6" />
          ) : (
            <HiOutlineMenuAlt3 className="w-6 h-6" />
          )}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-[90%] mx-5 bg-black p-4 z-20 lg:hidden">
          <ul className="flex flex-col gap-y-2">
            {links.map((link, idx) => (
              <li key={idx}>
                <Link
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)} // Close menu on link click
                  className={`block text-sm ${
                    pathName === link.href
                      ? "text-white font-semibold underline"
                      : "text-gray-300 font-normal"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex items-center gap-x-4 sm:gap-x-8">
        {user && (
          <>
            <div>
              <Button
                onClick={(ev) => {
                  ev.preventDefault();
                  router.push("/upload");
                }}
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

"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Sign out function

export default function UserNav({ user, signOut }) {
  // Check if user is authenticated

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10 rounded-full">
            <AvatarImage
              src="https://avatars.githubusercontent.com/u/6759280?v=4"
              alt="User Avatar"
            />
            <AvatarFallback className="rounded-full">
              {user?.name}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        {!user ? (
          // If no user, show sign-in and sign-up options
          <>
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Guest</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/auth">
                <Button variant="outline" className="w-full">
                  Sign In
                </Button>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/auth">
                <Button variant="outline" className="w-full">
                  Sign Up
                </Button>
              </Link>
            </DropdownMenuItem>
          </>
        ) : (
          // If user is logged in, show user info and sign-out option
          <>
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user?.name || "Jan"}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email || "jkasdf@asdkfj.com"}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={signOut}>
              Sign Out
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

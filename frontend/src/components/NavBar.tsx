// import { auth } from "@/auth";
import React from "react";
import { ModeToggle } from "./mode-toggle";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const NavBar = async () => {
  // const session = await auth();

  if (!true) return null;
  return (
    <div className="flex items-center justify-between m-4">
      <h1 className="text-xl lg:text-3xl font-extrabold text-center">
        BlinkAi Assigment
      </h1>
      <div className="flex gap-4">
        <ModeToggle />
        {true && (
          <Link href="/api/auth/signout">
            <Avatar>
              <AvatarImage
                src={`#`}
                alt={`#`}
              />
              <AvatarFallback>{'BlinkAI'}</AvatarFallback>
            </Avatar>
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;

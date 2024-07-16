import React from "react";
import { ModeToggle } from "../ModeToggle";
import Link from "next/link";
import { Button } from "../ui/button";

type Props = {};

interface ILink {
  title: string;
  url: string;
  icon?: React.ReactNode;
}

const Navbar = (props: Props) => {
  const navLinks: ILink[] = [
    {
      title: "Home",
      url: "/",
    },
    {
      title: "Features",
      url: "/",
    },
    {
      title: "Activities",
      url: "/",
    },
    {
      title: "Contact",
      url: "/",
    },
  ];
  return (
    <div className="flex items-center justify-between">
      <p>HealthSync</p>

      <div className="flex items-center justify-between gap-20">
        {navLinks.map((navLink: ILink, index) => (
          <Link
            href={navLink.url}
            key={index}
            className="font-sans text-lg font-medium text-foreground"
          >
            {navLink.title}
          </Link>
        ))}
      </div>
      <div className=" flex gap-10 items-center">
        <Link href={"/"} className="text-primary">
          Sign in
        </Link>
        <Button asChild className="">
          <Link href={"/"}> Become a Member</Link>
        </Button>
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;

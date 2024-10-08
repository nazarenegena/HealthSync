"use client";
import React, { useState } from "react";
import { ModeToggle } from "../ModeToggle";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { TiCancelOutline } from "react-icons/ti";
import { GiHamburgerMenu } from "react-icons/gi";
import runner from "../../assets/runner.svg";

type Props = {};

interface ILink {
  title: string;
  url: string;
  icon?: React.ReactNode;
}

const Navbar = (props: Props) => {
  // small screen sidebar state
  const [sidebar, setSidebar] = useState(false);
  const handleSidebar = () => {
    setSidebar(true);
    console.log("sidebar trigger", sidebar);
  };

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
    <div className="px-10">
      <div className="hidden lg:flex items-center justify-between ">
        <div className="flex items-center justify-between gap-20">
          <div className="flex items-center px-4">
            <Link href="/" className="font-serif text-primary/90 flex">
              Health <Image src={runner} alt="logo" width={20} height={20} />
              Sync
            </Link>
          </div>
          {navLinks.map((navLink: ILink, index) => (
            <Link
              href={navLink.url}
              key={index}
              className="font-sans text-md font-medium text-neutral"
            >
              {navLink.title}
            </Link>
          ))}
        </div>
        <div className=" flex gap-16 items-center">
          <Link
            href={"/login"}
            className="text-primary hover:underline underline-offset-8"
          >
            Login
          </Link>
          <Button asChild className="shadow-xl ">
            <Link href={"/signup"}> Become a Member</Link>
          </Button>
          <ModeToggle />
        </div>
      </div>

      <div>
        <GiHamburgerMenu
          size={48}
          fontSize="1em"
          onClick={() => setSidebar(true)}
          className="lg:hidden fixed  right-24 top-7 text-primary font-bold"
        />

        {/* small screen sidebar  */}
        {sidebar ? (
          <div className="lg:hidden flex flex-col gap-10 pt-16 px-2 text-2xl fixed bottom-0 right-0 z-40 h-full w-[300px] bg-primary drop-shadow-xl">
            {navLinks.map((navLink: ILink, index) => (
              <Link
                href={navLink.url}
                key={index}
                className="font-sans text-lg font-medium text-white mt-4 py-4 rounded-lg flex justify-center hover:bg-violet-400"
              >
                {navLink.title}
              </Link>
            ))}{" "}
            <Link
              href={"/app/signin"}
              className="font-medium text-white text-base  hover:underline underline-offset-8 px-2 mt-4 flex justify-center"
            >
              Login
            </Link>
            <Button asChild variant={"secondary"} className="shadow-xl ">
              <Link href={"/"}> Become a Member</Link>
            </Button>
            <div className="lg:hidden fixed top-2 flex justify-between w-full pr-4">
              <TiCancelOutline
                fontSize="1.5em"
                onClick={() => setSidebar(false)}
                className=""
              />
              <ModeToggle />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Navbar;

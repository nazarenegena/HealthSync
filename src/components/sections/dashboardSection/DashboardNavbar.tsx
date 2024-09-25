"use client";

import { ModeToggle } from "@/components/ModeToggle";
import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useAuth } from "@/contexts/AuthenticationContext";
import Image from "next/image";
import handwave from "@/assets/handwave.svg";

type Props = {};

const DashboardNavbar = (props: Props) => {
  const { user } = useAuth();
  return (
    <div className=" relative flex justify-between pt-10 bg-muted/15 h-28 w-full px-10">
      <div className="flex items-center justify-center">
        {" "}
        <p className="text-3xl font-normal tracking-wider text-muted-foreground/75 w-full">
          Hello there
        </p>
        <Image
          src={handwave}
          alt="handwave"
          width={50}
          height={50}
          className="ml-4"
        />
      </div>
      <div className=" relative flex justify-end gap-10">
        <input
          type="text"
          placeholder="search ..."
          name="search"
          className="w-72 h-10 rounded-full shadow-sm px-6 "
        />
        <IoSearchOutline
          size={20}
          className="absolute top-[0.75rem] right-28 cursor-pointer "
        />

        <div className="">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;

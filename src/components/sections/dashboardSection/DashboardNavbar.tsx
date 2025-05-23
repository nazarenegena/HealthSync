"use client";

import { ModeToggle } from "@/components/ModeToggle";
import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import Image from "next/image";
import handwave from "@/assets/handwave.svg";
import { useUser } from "@/contexts/UserContextProvider";

type Props = {};

const DashboardNavbar = (props: Props) => {
  const { user } = useUser();
  return (
    <div className=" relative flex justify-between pt-10 bg-muted/15 h-28 w-full px-10 mb-5">
      <div className="flex items-center justify-center">
        {" "}
        <p className="text-3xl font-normal tracking-wider text-muted-foreground/75 w-full">
          Hello {user?.firstname}
        </p>
        <Image
          src={handwave}
          alt="handwave"
          width={50}
          height={50}
          className="ml-4 "
        />
      </div>
      <div className=" relative flex justify-end gap-10">
        <input
          type="text"
          placeholder="search ..."
          name="search"
          className="lg:h-10 h-8 w-72 px-2 border border-muted-foreground/20 text-sm font-medium rounded-md outline-none focus:ring-primary/80 focus:border-primary/80"
        />
        <IoSearchOutline
          size={18}
          className="absolute top-[0.75rem] right-28 cursor-pointer text-muted-foreground"
        />

        <div className="">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;

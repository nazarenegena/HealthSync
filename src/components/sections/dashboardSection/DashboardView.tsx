"use client";

import React from "react";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthenticationContext";
import userPlaceholder from "@/assets/user.svg";
import { RiArrowDropDownLine } from "react-icons/ri";

type Props = {};

const DashboardView = (props: Props) => {
  const { user } = useAuth();

  return (
    <div className="bg-muted/15 h-full px-10 ">
      <div className="grid grid-cols-[80%_20%] mt-10">
        <p>The dashboard view</p>
        <div className="cursor-pointer flex flex-col items-center ">
          <Image
            src={userPlaceholder}
            alt="user placeholder"
            width={30}
            height={30}
          />
          <p className="text-primary font-medium text-xs">{user.name}</p>
          <RiArrowDropDownLine />
        </div>
      </div>
    </div>
  );
};

export default DashboardView;

"use client";

import React, { useState } from "react";
import Image from "next/image";
import runner from "@/assets/runner.svg";
import { IoClose } from "react-icons/io5";
import { useAuth } from "@/contexts/AuthenticationContext";

type Props = {
  onClose?: () => void;
};

const HelpChart = ({ onClose }: Props) => {
  const { user } = useAuth();

  return (
    <div className="h-[45rem] bg-white dark:bg-black w-96 absolute right-3 bottom-3 z-20 shadow-lg px-8 rounded-md">
      <div className="flex justify-between items-center mt-8">
        <div className="flex items-center">
          <p className="font-serif text-primary flex">
            Health <Image src={runner} alt="logo" width={20} height={20} />
            Sync
          </p>
        </div>{" "}
        <IoClose
          onClick={onClose}
          size={22}
          className="text-primary hover:text-rose-600 cursor-pointer"
        />
      </div>
      <div className="mt-10">
        <p className="font-bold text-primary/80 text-3xl ">hello {user.name}</p>
        <p className="font-bold text-2xl mt-3 text-muted-foreground">
          How can we help ?
        </p>
      </div>
    </div>
  );
};

export default HelpChart;

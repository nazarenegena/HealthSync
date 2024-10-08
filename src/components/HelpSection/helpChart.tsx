"use client";

import React, { useState } from "react";
import Image from "next/image";
import runner from "@/assets/runner.svg";
import { IoClose } from "react-icons/io5";
import { useAuth } from "@/contexts/AuthenticationContext";
import { FaHome } from "react-icons/fa";
import { SlQuestion } from "react-icons/sl";
import { TiMessages } from "react-icons/ti";

import smileEmoji from "@/assets/smile.svg";

type Props = {
  onClose?: () => void;
};

const HelpChart = ({ onClose }: Props) => {
  const { user } = useAuth();

  return (
    <div className="h-[45rem] bg-white dark:bg-black w-96 absolute right-3 bottom-3 z-20 shadow-lg rounded-md">
      <div className="px-6 overflow-y-auto h-[40rem]">
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
        <div className="mt-8">
          <p className="font-bold text-primary/80 text-3xl flex items-center ">
            hello {user.name}{" "}
            <span>
              {" "}
              <Image
                src={smileEmoji}
                alt="smile"
                width={24}
                height={24}
                className="ml-2"
              />
            </span>
          </p>

          <p className="font-bold text-2xl mt-3 text-muted-foreground">
            How can we help ?
          </p>
          <div className="bg-muted py-7 px-4 rounded-md mt-7 shadow-sm">
            <div>
              <input
                type="text"
                placeholder="Search for help"
                className="w-full h-10 text-sm px-4 font-bold rounded-md "
              />

              <div className="mt-2 ml-4">
                <p className="mt-4 text-sm text-muted-foreground">
                  How to cast workouts on TV
                </p>
                <p className="mt-4 text-sm text-muted-foreground">
                  How to link your Samsung watch ?
                </p>
                <p className="mt-4 text-sm text-muted-foreground">
                  TV streaming services supported ?
                </p>
                <p className="mt-4 text-sm text-muted-foreground">
                  Can I get a free subscription
                </p>
              </div>
            </div>
          </div>
          <div className="bg-muted py-7 px-4 rounded-md mt-5 shadow-sm">
            <p className="font-semibold text-sm ">Ask a question</p>
            <p className="mt-2 text-sm text-muted-foreground">
              AI Agent and team can help
            </p>
          </div>
          <div className="bg-muted py-7 px-4 rounded-md mt-5 shadow-sm">
            <p className="font-semibold text-sm ">Shop Accessories</p>
          </div>
        </div>
      </div>
      <div className="border-t-0 shadow-inner  mt-6 absolute bottom-0 w-full h-20 bg-white dark:bg-black rounded-b-md">
        <div className="flex justify-evenly items-center mt-5">
          <div className="flex flex-col items-center cursor-pointer hover:text-primary">
            <FaHome size={22} />
            <p className="mt-2 text-xs ">Home</p>
          </div>
          <div className="flex flex-col items-center cursor-pointer hover:text-primary">
            <TiMessages size={22} />
            <p className="mt-2 text-xs">Messages</p>
          </div>
          <div className="flex flex-col items-center cursor-pointer hover:text-primary">
            <SlQuestion size={22} />
            <p className="mt-2 text-xs">Help</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpChart;

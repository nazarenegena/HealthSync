"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthenticationContext";
import userPlaceholder from "@/assets/user.svg";
import profileImg from "@/assets/face-potrait.jpg";
import MiniCards from "@/components/MiniCards";
import heart from "@/assets/heart.svg";
import moon from "@/assets/moon.svg";
import burn from "@/assets/explosive.svg";
import jogging from "@/assets/jogging.svg";
import MainCard from "@/components/MainCard";
import SimpleCard from "@/components/SimpleCard";
import { RxDotsHorizontal } from "react-icons/rx";
import CalenderView from "./CalenderView";
import Link from "next/link";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import { TiCancelOutline } from "react-icons/ti";
import { ActivityAreaChart } from "@/components/ChartsSection/ActivityAreaChart";

type Props = {};

const DashboardView = (props: Props) => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdown, setIsDropdown] = useState(false);
  const arrowStyle = "cursor-pointer text-pink-600";

  return (
    <div className="bg-muted/15 h-full px-10">
      <div className="grid grid-cols-[75%_25%] mt-10 gap-5">
        <div className="">
          <div className="flex">
            <MiniCards icon={heart} metrics="110" title="Heart Rate" />
            <MiniCards
              icon={burn}
              metrics="65"
              title="Calories Burnt"
              margin="mx-4"
            />
            <MiniCards
              icon={jogging}
              metrics="2.5km"
              title="Running"
              margin="mr-4"
            />
            <MiniCards icon={moon} metrics="8 Hours" title="Sleeping" />
          </div>

          <div className=" grid grid-cols-[60%_40%] mt-8">
            <MainCard height="h-auto" margin="mr-6">
              <div className="flex justify-between">
                <p className="text-base font-bold">Activity</p>
                <div className="flex items-center justify-center">
                  <p className="text-muted-foreground/75 text-sm">Weekly</p>

                  {!isDropdown ? (
                    <MdKeyboardArrowDown
                      size={20}
                      className={`${arrowStyle} ml-2`}
                      onClick={() => setIsDropdown(true)}
                    />
                  ) : (
                    <MdKeyboardArrowUp
                      size={20}
                      className={`${arrowStyle} ml-2`}
                      onClick={() => setIsDropdown(false)}
                    />
                  )}
                </div>
              </div>
              <ActivityAreaChart />
            </MainCard>
            <MainCard height="h-auto">
              <p>The statistics</p>
            </MainCard>
          </div>
          <div className="bg-primary-foreground dark:bg-muted-foreground/10 mt-8 flex h-48 gap-8 items-center justify-center rounded-md">
            <SimpleCard title="Fresh Vegges" />
            <SimpleCard title="Fresh Fruit Juice" />
            <SimpleCard title="Fresh Orange Fruits" />
          </div>

          <div className=" grid grid-cols-[45%_55%] mt-8">
            <MainCard margin="mr-6" height="h-56">
              <p className="">The statistics</p>
            </MainCard>
            <MainCard height="h-56">
              <p>The new statistics</p>
            </MainCard>
          </div>
        </div>
        <div className="bg-primary-foreground dark:bg-muted-foreground/10 rounded-md border border-muted-foreground/10 px-5 pt-5">
          {/* profile picture */}
          <div className="relative">
            <div className="flex justify-between">
              <p className="text-sm tracking-wider font-medium">Profile</p>

              <RxDotsHorizontal
                onClick={() => setIsOpen(true)}
                className="cursor-pointer hover:text-pink-600 hover:font-bold"
              />
            </div>

            {isOpen ? (
              <div className="bg-primary-foreground dark:bg-black shadow-lg z-40 rounded-md p-5 flex   absolute right-0">
                <TiCancelOutline
                  size={20}
                  onClick={() => setIsOpen(false)}
                  className="cursor-pointer absolute right-3 hover:text-pink-600 hover:font-bold"
                />
                <div className="flex flex-col items-center justify-center mt-6">
                  <Link
                    href={"/dashboard/settings"}
                    className="w-36 py-1 text-center text-muted-foreground/80 hover:shadow-lg hover:bg-primary/30 rounded-md text-sm dark:text-white "
                  >
                    Edit Profile
                  </Link>
                  <Link
                    href={"/"}
                    className="w-36 py-1 text-center text-muted-foreground/80 mt-4 hover:shadow-lg hover:bg-primary/30 rounded-md text-sm dark:text-white "
                  >
                    Logout
                  </Link>
                </div>
              </div>
            ) : null}
            <div className="cursor-pointer flex flex-col items-center mt-4">
              <Image
                src={profileImg}
                alt="profile picture"
                width={70}
                height={70}
                className="rounded-full aspect-square object-cover"
              />
              <div className="mt-2 text-center">
                <p className="text-muted-foreground font-medium text-sm">
                  {user.name}
                </p>
                <p className="text-muted-foreground/80 font-normal text-xs">
                  {user.email}
                </p>
              </div>
            </div>

            {/* anthropometrics */}

            <div className="flex justify-between gap-8 my-6 border border-muted-foreground/10 w-full px-3 py-4 rounded-md">
              <div>
                <p className="text-sm font-medium">65kg</p>
                <p className="text-sm text-muted-foreground/75 mt-1">Weight</p>
              </div>
              <div>
                <p className="text-sm font-medium">170cm</p>
                <p className="text-sm text-muted-foreground/75 mt-1">height</p>
              </div>
              <div>
                <p className="text-sm font-medium">25</p>
                <p className="text-sm text-muted-foreground/75 mt-1">Age</p>
              </div>
            </div>
          </div>

          {/* calender */}
          <p className=" mt-2 text-sm tracking-wider font-medium">Calender</p>
          <div className="flex flex-col justify-center items-center mt-2">
            <CalenderView />
          </div>

          {/* scheduled */}
          <div className="mt-4">
            <p className=" mb-4 text-sm tracking-wider font-medium">
              Scheduled
            </p>
            <div className=" border border-muted-foreground/25 px-5 py-3 rounded-md mt-3">
              <p className="text-xs text-muted-foreground/80">Fitness</p>
              <p className="mt-2 text-sm">Training Yoga Class</p>
            </div>
            <div className=" border border-muted-foreground/25 px-5 py-3 rounded-md mt-5">
              <p className="text-xs text-muted-foreground/80">Cardio</p>
              <p className="mt-2 text-sm">Training Swimming</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;

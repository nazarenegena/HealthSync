"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthenticationContext";
import userPlaceholder from "@/assets/user.svg";
import profileImg from "@/assets/face-potrait.jpg";
import MiniCards from "@/components/MiniCards";
import freshFruitJuice from "@/assets/fresh-fruit-juice.jpg";
import fruits from "@/assets/fruits.jpg";
import vegges from "@/assets/vegges.jpg";
import heart from "@/assets/heart.svg";
import moon from "@/assets/moon.svg";
import burn from "@/assets/explosive.svg";
import jogging from "@/assets/jogging.svg";
import { BsFillClockFill } from "react-icons/bs";
import MainCard from "@/components/MainCard";
import SimpleCard from "@/components/SimpleCard";
import { RxDotsHorizontal } from "react-icons/rx";
import CalenderView from "./CalenderView";
import Link from "next/link";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import { TiCancelOutline } from "react-icons/ti";
import { ActivityAreaChart } from "@/components/ChartsSection/ActivityAreaChart";
import { ActivityRadialChart } from "@/components/ChartsSection/ActivityRadialChart";

type Props = {};

const DashboardView = (props: Props) => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [openSchedule, setOpenSchedule] = useState(false);
  const [isDropdown, setIsDropdown] = useState(false);
  const arrowStyle = "cursor-pointer text-primary font-bold";

  return (
    <div className="bg-muted/15 h-full px-10">
      <div className="grid grid-cols-[75%_25%] mt-5 gap-5">
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
              <ActivityAreaChart />
            </MainCard>
            <MainCard height="h-auto">
              <ActivityRadialChart />
            </MainCard>
          </div>

          {/* recommended foods section */}

          <div className="bg-primary-foreground dark:bg-muted-foreground/10 h-80 mt-8 px-6  flex flex-col items-center  rounded-md">
            <div className="flex justify-between w-full mt-10 ">
              <Link
                href={"/dashboard/mealplan"}
                className="text-muted-foreground/75  tracking-wide cursor-pointer hover:text-primary/90 text-2xl"
              >
                Recommended Foods
              </Link>

              {!isDropdown ? (
                <div className="flex items-center justify-center mr-5">
                  <p className="text-muted-foreground/75 text-sm">Weekly</p>
                  <MdKeyboardArrowDown
                    size={20}
                    className={`${arrowStyle} ml-2`}
                    onClick={() => setIsDropdown(true)}
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center mr-5">
                  <p className="text-muted-foreground/75 text-sm">Monthly</p>
                  <MdKeyboardArrowUp
                    size={20}
                    className={`${arrowStyle} ml-2`}
                    onClick={() => setIsDropdown(false)}
                  />
                </div>
              )}
            </div>

            <div className="flex gap-10 relative mt-14">
              <Image
                src={vegges}
                alt="vegges"
                width={50}
                height={60}
                className="rounded-sm  absolute top-7 -left-6"
              />
              <SimpleCard>
                <div className="flex flex-col justify-center ml-14 mt-3">
                  <p className="mt-2">Fresh Vegges</p>
                  <p className="mt-2 text-primary font-normal text-sm">
                    7 Days
                  </p>
                  <p className="mt-1 text-muted-foreground/75 font-normal text-sm">
                    only dinner time
                  </p>
                </div>
              </SimpleCard>
              <Image
                src={freshFruitJuice}
                alt="fresh-fruit-juice"
                width={50}
                height={60}
                className="rounded-sm  absolute top-7 left-60"
              />
              <SimpleCard>
                <div className="flex flex-col justify-center ml-14 mt-3">
                  <p className="mt-2">Fresh Fruit Juice</p>
                  <p className="mt-2 text-primary font-normal text-sm">
                    12 Days
                  </p>
                  <p className="mt-1 text-muted-foreground/75 font-normal text-sm">
                    only lunch time
                  </p>
                </div>
              </SimpleCard>
              <Image
                src={fruits}
                alt="fruits"
                width={50}
                height={60}
                className="rounded-sm  absolute top-7 right-48"
              />
              <SimpleCard>
                <div className="flex flex-col justify-center ml-14 mt-3">
                  <p className="mt-2">Fresh Orange Fruits</p>
                  <p className="mt-2 text-primary font-normal text-sm">
                    7 Days
                  </p>
                  <p className="mt-1 text-muted-foreground/75 font-normal text-sm">
                    only breakfast time
                  </p>
                </div>
              </SimpleCard>
            </div>
          </div>
        </div>

        {/* Profile Section */}

        <div className="bg-primary-foreground dark:bg-muted-foreground/10 rounded-md border border-muted-foreground/10 px-5 pt-5">
          {/* profile picture */}
          <div className="relative">
            <div className="flex justify-between">
              <p className="text-sm tracking-wider font-medium">Profile</p>

              <RxDotsHorizontal
                onClick={() => setIsOpen(true)}
                className="cursor-pointer hover:text-primary hover:font-bold"
              />
            </div>

            {isOpen ? (
              <div className="bg-gray-100 dark:bg-black dark:border dark:border-white text-primary-foreground shadow-lg z-40 rounded-md p-5 flex   absolute right-0">
                <TiCancelOutline
                  size={20}
                  onClick={() => setIsOpen(false)}
                  className="text-muted-foreground cursor-pointer absolute right-3 hover:text-primary hover:font-bold"
                />
                <div className="flex flex-col items-center justify-center mt-6">
                  <Link
                    href={"/dashboard/settings"}
                    className="w-36 py-1 text-center text-muted-foreground hover:shadow-lg hover:bg-primary/30 rounded-md text-sm  "
                  >
                    Edit Profile
                  </Link>
                  <Link
                    href={"/"}
                    className="w-36 py-1 text-center text-muted-foreground mt-4 hover:shadow-lg hover:bg-primary/30 rounded-md text-sm  "
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
          </div>

          {/* calender */}
          <div className="flex justify-between items-center mt-8 mb-2">
            <p className="  text-sm tracking-wider font-medium">Calender</p>{" "}
            <RxDotsHorizontal
              onClick={() => setOpenSchedule(true)}
              className="cursor-pointer hover:text-primary hover:font-bold"
            />
          </div>

          {openSchedule ? (
            <div className="bg-gray-100 dark:bg-black dark:border dark:border-white text-primary-foreground shadow-lg z-40 rounded-md p-5 flex   absolute right-5">
              <TiCancelOutline
                size={20}
                onClick={() => setOpenSchedule(false)}
                className=" text-muted-foreground cursor-pointer absolute right-1 top-2 hover:text-primary hover:font-bold"
              />

              <Link
                href={"/dashboard/schedule"}
                className="w-36 text-center text-muted-foreground hover:text-primary rounded-md text-sm  "
              >
                Edit Schedule
              </Link>
            </div>
          ) : null}

          <div className="flex flex-col justify-center items-center mt-2">
            <CalenderView />
          </div>
          {/* scheduled */}

          <div className="my-4 ">
            <p className=" mb-4 text-sm tracking-wider font-medium">
              Scheduled
            </p>

            <div className="mt-2 ">
              <div className="flex w-full items-center mb-2">
                <BsFillClockFill fill="#E88C31" />

                <p className="text-sm text-muted-foreground/80 ml-3">
                  12:00 - 13:00
                </p>
              </div>
              <div className="  bg-muted-foreground/10 shadow-lg px-5 py-3 rounded-md cursor-pointer hover:bg-muted-foreground/15 hover:shadow-lg">
                <Link href="/dashboard/schedule">
                  <p className="text-xs text-muted-foreground/80">Fitness</p>
                  <p className="mt-2 text-sm">Training Yoga Class</p>
                </Link>
              </div>
            </div>

            <div className="mt-5 ">
              <div className="flex w-full items-center mb-2">
                <BsFillClockFill fill="#E88C31" />

                <p className="text-sm text-muted-foreground/80 ml-3">
                  12:00 - 13:00
                </p>
              </div>

              <div className="  bg-muted-foreground/10 shadow-lg px-5 py-3 rounded-md cursor-pointer hover:bg-muted-foreground/15 hover:shadow-lg">
                <Link href="/dashboard/schedule">
                  <p className="text-xs text-muted-foreground/80">Cardio</p>
                  <p className="mt-2 text-sm">Training Swimming</p>
                </Link>
              </div>
            </div>

            <div className="mt-5 ">
              <div className="flex w-full items-center mb-2">
                <BsFillClockFill fill="#E88C31" />

                <p className="text-sm text-muted-foreground/80 ml-3">
                  12:00 - 13:00
                </p>
              </div>

              <div className="  bg-muted-foreground/10 shadow-lg px-5 py-3 rounded-md cursor-pointer hover:bg-muted-foreground/15 hover:shadow-lg">
                <Link href="/dashboard/schedule">
                  <p className="text-xs text-muted-foreground/80">Cardio</p>
                  <p className="mt-2 text-sm">Training Swimming</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;

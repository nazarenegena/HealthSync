"use client";

import React from "react";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthenticationContext";
import userPlaceholder from "@/assets/user.svg";
import profileImg from "@/assets/face-potrait.jpg";
import MiniCards from "@/components/MiniCards";
import heart from "@/assets/heart.svg";
import Card from "@/components/Card";
import SimpleCard from "@/components/SimpleCard";
import { RxDotsHorizontal } from "react-icons/rx";
import CalenderView from "./CalenderView";

type Props = {};

const DashboardView = (props: Props) => {
  const { user } = useAuth();

  return (
    <div className="bg-muted/15 h-full px-10 ">
      <div className="grid grid-cols-[75%_25%] mt-10 gap-5">
        <div className="">
          <div className="flex">
            <MiniCards icon={heart} metrics="25km" title="Heart Rate" />
            <MiniCards
              icon={heart}
              metrics="25km"
              title="Heart Rate"
              margin="mx-4"
            />
            <MiniCards
              icon={heart}
              metrics="25km"
              title="Heart Rate"
              margin="mr-4"
            />
            <MiniCards icon={heart} metrics="25km" title="Heart Rate" />
          </div>

          <div className=" grid grid-cols-[60%_40%] mt-8">
            <Card title="Activity" height="h-56" margin="mr-6">
              <p>The new statistics</p>
            </Card>
            <Card title="Activity" height="h-56">
              <p>The statistics</p>
            </Card>
          </div>
          <div className="bg-primary-foreground dark:bg-muted-foreground/10 mt-8 flex h-48 gap-8 items-center justify-center rounded-md">
            <SimpleCard title="Fresh Vegges" />
            <SimpleCard title="Fresh Fruit Juice" />
            <SimpleCard title="Fresh Orange Fruits" />
          </div>

          <div className=" grid grid-cols-[45%_55%] mt-8">
            <Card title="Activity" margin="mr-6" height="h-56">
              <p className="text-red-500">The statistics</p>
            </Card>
            <Card title="Activity" height="h-56">
              <p>The new statistics</p>
            </Card>
          </div>
        </div>
        <div className="bg-primary-foreground dark:bg-muted-foreground/10 rounded-md border border-muted-foreground/10 px-5 pt-5">
          {/* profile picture */}
          <div>
            <div className="flex justify-between">
              <p className="text-sm tracking-wider font-medium">Profile</p>
              <RxDotsHorizontal />
            </div>

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
                <p className="text-sm text-muted-foreground/80 mt-1">Weight</p>
              </div>
              <div>
                <p className="text-sm font-medium">170cm</p>
                <p className="text-sm text-muted-foreground/80 mt-1">height</p>
              </div>
              <div>
                <p className="text-sm font-medium">25</p>
                <p className="text-sm text-muted-foreground/80 mt-1">Age</p>
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

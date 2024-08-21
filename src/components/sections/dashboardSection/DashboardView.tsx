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
              <p>The statistics</p>
            </Card>
            <Card title="Activity" height="h-56">
              <p>The new statistics</p>
            </Card>
          </div>
        </div>
        <div className="bg-primary-foreground dark:bg-muted-foreground/10 rounded-md border border-muted-foreground/10 px-5 pt-5">
          <div className="flex justify-between">
            <p className="text-sm tracking-wider font-medium">Profile</p>
            <RxDotsHorizontal />
          </div>

          <div className="cursor-pointer flex flex-col items-center mt-7">
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
            <div className="flex justify-between gap-8 mt-10 border border-muted-foreground/10 w-full px-3 py-4 rounded-md">
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
        </div>
      </div>
    </div>
  );
};

export default DashboardView;

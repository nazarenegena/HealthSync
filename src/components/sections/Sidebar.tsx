"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import runner from "@/assets/runner.svg";
import workout from "@/assets/workout.svg";
import pilates from "@/assets/pilates.svg";
import { ModeToggle } from "@/components/ModeToggle";
import { usePathname } from "next/navigation";

type Props = {};

const Sidebar = (props: Props) => {
  const pathname = usePathname();

  const linkStyle =
    "h-12  rounded-md px-4 pt-3 hover:shadow-lg hover:bg-primary/30 my-7";
  return (
    <div className="relative shadow-lg">
      <div className="flex flex-col mt-10 mx-5">
        <div className="flex items-center px-4">
          <Link href="/" className="font-serif text-primary/90 flex">
            Health <Image src={runner} alt="logo" width={20} height={20} />
            Sync
          </Link>
        </div>
        <div className="flex flex-col mt-20">
          <Link
            href="/dashboard"
            className={`${linkStyle} ${
              pathname === "/dashboard" ? "bg-primary/30 shadow-md" : null
            } `}
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard/workout"
            className={`${linkStyle} ${
              pathname === "/dashboard/workout"
                ? "bg-primary/30 shadow-md"
                : null
            }`}
          >
            Workout
          </Link>
          <Link
            href="/dashboard/schedule"
            className={`${linkStyle} ${
              pathname === "/dashboard/schedule"
                ? "bg-primary/30 shadow-md"
                : null
            }`}
          >
            Schedule
          </Link>
          <Link
            href="/dashboard/mealplan"
            className={`${linkStyle} ${
              pathname === "/dashboard/mealplan"
                ? "bg-primary/30 shadow-md"
                : null
            }`}
          >
            Meal Plan
          </Link>
          <Link
            href="/dashboard/settings"
            className={`${linkStyle} ${
              pathname === "/dashboard/settings"
                ? "bg-primary/30 shadow-md"
                : null
            }`}
          >
            Settings
          </Link>
          <Link href="/" className={`${linkStyle}`}>
            Logout
          </Link>
        </div>
      </div>
      <div className="absolute bottom-0 left-4 flex flex-col">
        <Image src={workout} alt="yoga" width={200} />
      </div>
    </div>
  );
};

export default Sidebar;

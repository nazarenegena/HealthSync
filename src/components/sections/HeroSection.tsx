import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import heroImage from "@/assets/jogging.svg";
import yoga from "@/assets/girl-doing-yoga.svg";
import mealplan from "@/assets/meal.svg";
import scheduler from "@/assets/cycle-schedule.svg";
import jogger from "@/assets/jogger.svg";
import schedules from "@/assets/calendar.svg";

type Props = {};

const HeroSection = (props: Props) => {
  return (
    <div className="mt-16">
      <div className="grid grid-cols-2 gap-x-8 px-10">
        <div className="flex flex-col justify-center items-center">
          <p className="text-5xl mt-20 leading-relaxed tracking-wider font-medium text-neutral font-serif text-center">
            Track your Active Lifestyle
          </p>
          <p className="text-muted-foreground mt-5">
            {" "}
            We offer fresh fitness schedules, workout regimes and mealplanners.{" "}
          </p>
          <Button asChild className="w-48 mt-8">
            <Link href="/dashboard">Get Started</Link>
          </Button>
        </div>

        <Image
          src={heroImage}
          alt="fitness_app_logo"
          width={500}
          height={500}
          className="ml-24"
        />
      </div>

      <div className="flex  gap-32 w- bg-primary/5 px-10 h-64 items-center justify-center">
        <div className="flex flex-col mx-10 items-center justify-center">
          <Image src={scheduler} alt="calender" width={100} />
          <p className="mt-6 text-foreground">Schedule your Routine</p>
        </div>
        <div className="mx-10 flex flex-col items-center justify-center">
          <Image src={mealplan} alt="meal planning" width={100} />
          <p className="mt-6 text-foreground">Plan your Meals</p>
        </div>
        <div className="mx-10 flex flex-col items-center justify-center">
          <Image src={jogger} alt="yoga" width={100} />
          <p className="mt-6 text-foreground">Customize your Workout </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

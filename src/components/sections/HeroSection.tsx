import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import heroImage from "@/assets/lotus-yoga-pose.svg";
import mealPlan from "@/assets/online-diet-plan.svg";
import scheduler from "@/assets/calender.svg";
import fitness from "@/assets/fitness.svg";
import pilates from "@/assets/pilates.svg";
import workout from "@/assets/workout.svg";

type Props = {};

const HeroSection = (props: Props) => {
  return (
    <div className="mt-6">
      <div className="grid grid-cols-3 px-10">
        <div className="flex flex-col items-center justify-center ">
          <p className="text-6xl leading-relaxed tracking-wider font-medium text-neutral font-serif text-center">
            Sync your <span className="text-primary/85">Active</span> Lifestyle
          </p>
          <p className="text-muted-foreground mt-5 text-center">
            {" "}
            We offer fresh fitness schedules, workout regimes and mealplanners.{" "}
          </p>
          <Button asChild className="w-48 mt-8">
            <Link href="/dashboard">Get Started</Link>
          </Button>
        </div>
        <div className="w-[40rem] h-[45rem] relative ">
          <Image
            src={heroImage}
            alt="fitness_app_logo"
            fill
            className=" object-contain"
          />
        </div>

        <div className="flex flex-col mt-20 items-end justify-center">
          <div className="flex flex-col mr-12 mb-3 items-center justify-center">
            <Image src={scheduler} alt="calender" width={50} />
            <p className="mt-6 text-foreground font-semibold">
              Schedule your Routine
            </p>
            <p className="text-muted-foreground text-xs mt-3">
              Get to plan your workout regime
            </p>
            <hr className="w-64 h-px my-8 bg-muted border-0" />
          </div>
          <div className="flex flex-col mr-12 mb-3 items-center justify-center">
            <Image src={mealPlan} alt="meal planning" width={50} />

            <p className="flex flex-col mt-6 text-foreground">
              Plan your Meals
            </p>
            <p className="text-muted-foreground text-xs mt-3">
              Create your Weekly
            </p>
            <hr className="w-64 h-px my-8 bg-muted border-0" />
          </div>
          <div className="flex flex-col mr-12 mb-3 items-center justify-center">
            <Image src={fitness} alt="yoga" width={50} />
            <p className="mt-6 text-foreground">Customize your Workout </p>
            <p className="text-muted-foreground text-xs mt-3">
              Get to plan your workout regime
            </p>
            <hr className="w-64 h-px my-8 bg-muted border-0" />
          </div>
        </div>
      </div>

      <div className="bg-primary/5 grid grid-cols-2 h-40">
        <div className="border-r-2 border-primary/10 flex justify-center items-center">
          <div className="mr-6">
            <p className=" text-primary/60 font-medium">
              Free Trial to begin with
            </p>
            <p className="text-2xl text-primary font-semibold tracking-wider">
              Exclusive Classes
            </p>
          </div>

          <Image src={pilates} alt="yoga" width={150} />
        </div>
        <div className="flex justify-center items-center">
          <div className="mr-6">
            <p className=" text-primary/60 font-medium">Watch tutorials</p>
            <p className="text-2xl text-primary font-semibold tracking-wider">
              Personalized Training
            </p>
          </div>
          <Image src={workout} alt="workout" width={150} />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

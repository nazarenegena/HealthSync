import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IWorkout } from "@/lib/types";
import Abs from "../../assets/abs.jpg";
import Arms from "../../assets/arms.jpg";
import Legs from "../../assets/legs.jpg";
import Cardio from "../../assets/cardio.jpg";
import Shoulder from "../../assets/shoulders.jpg";
import Back from "../../assets/back.jpg";

type Props = {
  workout: IWorkout;
};

const WorkoutCard = ({ workout }: Props) => {
  const router = useRouter();
  const handleViewWorkout = () => {
    router.push(`/dashboard/workout/${workout.id}`);
  };
  const { category, equipment } = workout;
  return (
    <div
      key={workout.id}
      className=" cursor-pointer relative  flex flex-col items-center justify-center w-[30rem] h-56 rounded-md shadow-md hover:shadow-xl transform hover:scale-75 transition duration-700 ease-in-out"
      onClick={handleViewWorkout}
    >
      <Image
        src={
          workout.category?.name === "Abs"
            ? Abs
            : workout.category?.name === "Arms"
            ? Arms
            : workout.category?.name === "Legs"
            ? Legs
            : workout.category?.name === "Cardio"
            ? Cardio
            : workout.category?.name === "Shoulders"
            ? Shoulder
            : workout.category?.name === "Back"
            ? Back
            : ""
        }
        alt={workout.category?.name || "Workout Image"}
        fill
        className=" absolute inset-0 w-full h-full object-cover bg-muted-foreground/10 dark:bg-muted-foreground/80 rounded-t-lg rounded-md"
      />
      <div className="absolute bg-black  w-full h-full opacity-40 rounded-md"></div>

      {(equipment ?? []).length > 0 ? (
        (equipment ?? []).map((item) => (
          <div key={item.id} className=" mt-2">
            <p className="absolute left-2 bottom-2 text-xs font-semibold text-white/80 bg-primary/25 p-2 rounded-full tracking-wider">
              {" "}
              {item.name}
            </p>
          </div>
        ))
      ) : (
        <p className="absolute left-2 bottom-2 text-xs text-white/80 font-semibold bg-primary/25 p-2 rounded-full tracking-wider">
          No equipment needed
        </p>
      )}

      <div className="flex flex-col items-center absolute">
        <p className="font-bold text-2xl text-white text-shadow-lg z-50 font-sans tracking-wider ">
          {category?.name || "Unknown"} Challenge
        </p>
      </div>
    </div>
  );
};

export default WorkoutCard;

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IWorkout } from "@/lib/types";
import { IoIosConstruct } from "react-icons/io";
import BlankPic from "../../assets/blank-img.jpg";

type Props = {
  workout: IWorkout;
};

const WorkoutCard = ({ workout }: Props) => {
  const router = useRouter();
  const handleViewWorkout = () => {
    router.push(`/dashboard/workout/${workout.id}`);
  };
  const {
    category,
    muscles,
    images,
    muscles_secondary,
    equipment,
    translations,
  } = workout;
  return (
    <div
      key={workout.id}
      className=" cursor-pointer relative bg-white dark:bg-muted-foreground/15 flex flex-col items-center w-full h-[24rem] rounded-md shadow-md hover:shadow-xl  transform hover:scale-120 transition duration-350 ease-in-out"
      onClick={handleViewWorkout}
    >
      <p className="absolute left-2 bottom-2 text-xs text-highlight bg-primary/10 p-2 rounded-full tracking-wider ">
        11 min
      </p>
      {(images ?? []).length > 0 ? (
        <Image
          src={images?.[0]?.image || ""}
          alt={workout.category?.name || "Workout Image"}
          width={100}
          height={60}
          className="w-full h-56 object-cover bg-muted-foreground/10 dark:bg-muted-foreground/80 rounded-t-lg"
        />
      ) : (
        <Image
          src={BlankPic}
          width={100}
          height={60}
          alt="placeholder-pic"
          className="w-full h-56 object-cover bg-muted-foreground/10 dark:bg-muted-foreground/80 rounded-t-lg"
        />
      )}

      <div className="absolute h-[24rem]  w-full z-20 bg-muted-foreground/20 opacity-30 rounded-md"></div>

      <div className="flex flex-col items-center mt-10">
        <p className="font-bold text-2xl font-sans tracking-wider ">
          {category?.name || "Unknown"} Challenge
        </p>

        {(equipment ?? []).length > 0 ? (
          (equipment ?? []).map((item) => (
            <div key={item.id} className=" mt-2">
              <p className=" text-muted-foreground text-sm font-semibold">
                {" "}
                {item.name}
              </p>
            </div>
          ))
        ) : (
          <p className="text-muted-foreground text-sm font-semibold mt-3">
            No equipment needed
          </p>
        )}
        <p>{}</p>
      </div>
    </div>
  );
};

export default WorkoutCard;

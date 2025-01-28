import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export interface IWorkout {
  id: string;
  bodyPart: string;
  equipment: string;
  name: string;
  gifUrl: string;
  target: string;
  secondaryMuscles: string[];
  instructions: string[];
}

type Props = {
  id?: string;
  bodyPart?: string;
  equipment?: string;
  name?: string;
  gifUrl: string;
  target?: string;
  secondaryMuscles?: string[];
  instructions?: string[];
};

const WorkoutCard = ({
  id,
  bodyPart,
  equipment,
  name,
  gifUrl,
  target,
  secondaryMuscles,
  instructions,
}: Props) => {
  const router = useRouter();
  const handleViewWorkout = () => {
    router.push(`/dashboard/workout/${id}`);
  };
  return (
    <div
      key={id}
      className="grid grid-row-3 gap-4 p-4 cursor-pointer"
      onClick={handleViewWorkout}
    >
      <div className=" relative bg-white  flex flex-col items-center  w-full h-[24rem]  rounded-md shadow-md hover:shadow-xl transform hover:scale-120 transition duration-350 ease-in-out">
        <Image
          src={gifUrl}
          alt="workout-pic"
          width={200}
          height={150}
          className="object-contain w-full h-[24rem] rounded"
        />
        <div className="absolute h-[24rem]  w-full z-20 bg-muted-foreground/20 opacity-30 rounded-md"></div>
        <div className="absolute top-2 left-3 font-bold text-sm py-2 w-52 ">
          <p className="text-black/80 z-50 text-sm tracking-wider"> {name}</p>
        </div>
      </div>
    </div>
  );
};

export default WorkoutCard;

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
      <div>{name}</div>
      <div>{equipment}</div>
      <Image
        src={gifUrl}
        alt="workout-pic"
        width={100}
        height={50}
        unoptimized
      />
      <div>{target}</div>
      <div>{secondaryMuscles}</div>
      <div>{instructions}</div>
      <div>{bodyPart}</div>
    </div>
  );
};

export default WorkoutCard;

"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import axiosClient from "@/app/services/axiosInstance";

interface IExercise {
  bodyPart?: string;
  equipment?: string;
  gifUrl?: string;
  id?: string;
  name?: string;
  target?: string;
  secondaryMuscles?: string;
  instructions?: string;
}

export default function Page({ params }: { params: { id: string } }) {
  const client = axiosClient();

  // Fetching individual workout
  const fetchWorkout = async (): Promise<IExercise> => {
    const response = await client.get<IExercise>(
      `/exercises/exercise/${params.id}`
    );
    console.log(response.data, "the data");
    return response.data;
  };

  const {
    data: exercise,
    error,
    isLoading,
  } = useQuery<IExercise, Error>({
    queryKey: ["workout", params.id],
    queryFn: fetchWorkout,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!exercise) {
    return <div>No exercise data found.</div>;
  }

  return (
    <div className="">
      <div className="relative">
        <div className="absolute top-0 bg-muted-foreground/25 dark:bg-black/20 w-full h-full z-20 opacity-60 "></div>
        {exercise.gifUrl && (
          <div className="w-full flex justify-center">
            <Image
              src={exercise.gifUrl}
              alt={`${exercise.name || "exercise"} gif`}
              width={300}
              height={300}
              className="object-cover"
            />
          </div>
        )}
        <div className="p-5 flex flex-col items-center">
          <p className="font-bold text-5xl font-sans tracking-wider ">
            10 - Min Arm Challenge
          </p>
          <p className=" text-sm text-muted-foreground tracking-wider mt-2">
            11 min | intensity
          </p>
        </div>
      </div>

      <h1>{exercise.name}</h1>
      <p>Body Part: {exercise.bodyPart || "N/A"}</p>
      <p>Equipment: {exercise.equipment || "N/A"}</p>
      <p>Target Muscle: {exercise.target || "N/A"}</p>
      <p>Secondary Muscles: {exercise.secondaryMuscles || "N/A"}</p>
      <p>Instructions: {exercise.instructions || "N/A"}</p>
    </div>
  );
}

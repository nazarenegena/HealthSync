"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { MoveLeft } from "lucide-react";
import axiosClient from "@/app/services/axiosInstance";
import Link from "next/link";

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
  const divStyle = "my-2  py-5 flex items-center";
  const titleText = "text-lg font-semibold text-primary";
  const text = "ml-5 font-sans";

  // Fetching individual workout
  const fetchWorkout = async (): Promise<IExercise> => {
    const response = await client.get<IExercise>(
      `/exercises/exercise/${params.id}`
    );
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
    return (
      <div className="flex items-center justify-center mt-40">
        <p className="text-xl text-primary/75 tracking-wider font-bold">
          Loading{" "}
        </p>
        <Loader className="animate-spin ml-10 text-primary/70" size={42} />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!exercise) {
    return <div>No exercise data found.</div>;
  }

  return (
    <div className="mb-10">
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
            {exercise.name} Challenge
          </p>
          <p className=" text-sm text-muted-foreground tracking-wider mt-2">
            11 min | intensity
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center  px-5">
        <div className={`${divStyle}`}>
          <p className={`${titleText}`}>Target Areas: </p>
          <p className={`${text}`}>{exercise.target || "N/A"} ,</p>
          <p className="ml-3 font-sans">{exercise.secondaryMuscles || "N/A"}</p>
        </div>

        <div className={`${divStyle}`}>
          <p className={`${titleText}`}>Body Part:</p>
          <p className={`${text}`}>{exercise.bodyPart || "N/A"}</p>
        </div>

        <div className={`${divStyle}`}>
          <p className={`${titleText}`}>Equipment:</p>
          <p className={`${text}`}>{exercise.equipment || "N/A"}</p>
        </div>

        <div className="my-2  py-5 flex flex-col items-center justify-center">
          <p className={`${titleText}`}>Instructions:</p>
          <p
            className={`${text} text-center mt-2 tracking-wider text-base shadow-inner p-5 border border-muted-foreground/10 bg-primary/5 rounded-md leading-8`}
          >
            {exercise.instructions || "N/A"}
          </p>
        </div>
        <Link
          href="/dashboard/workout"
          className="flex bg-primary/60  py-2 rounded-full w-32  justify-center shadow-md hover:bg-primary/70 "
        >
          <MoveLeft size={20} /> <p className="text-sm ml-2">Back</p>
        </Link>
      </div>
    </div>
  );
}

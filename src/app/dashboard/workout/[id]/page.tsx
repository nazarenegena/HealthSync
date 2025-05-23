"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { MoveLeft } from "lucide-react";
import axiosClient from "@/app/services/axiosInstance";
import Link from "next/link";
import Muscles from "../../../../assets/Muscles.jpg";
import { IWorkout } from "@/lib/types";

export default function Page({ params }: { params: { id: string } }) {
  const client = axiosClient();
  const divStyle = "my-2 py-5 flex flex-col items-center  w-full";
  const titleText = "text-lg font-semibold text-primary";
  const text = "ml-5 font-sans";

  // Fetching individual workout
  const fetchWorkout = async (): Promise<IWorkout> => {
    const response = await client.get<IWorkout>(
      `https://wger.de/api/v2/exerciseinfo/${params.id}/`
    );
    return response.data;
  };

  const {
    data: workout,
    error,
    isLoading,
  } = useQuery<IWorkout, Error>({
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

  if (!workout) {
    return <div>No exercise data found.</div>;
  }
  const {
    category,
    muscles,
    images,
    muscles_secondary,
    equipment,
    variations,
    translations,
  } = workout;

  console.log("the workout", workout.translations?.[0]);
  return (
    <div className="h-full">
      <div className="relative">
        <div className="absolute top-0 bg-muted-foreground/20 dark:bg-black/20 w-full h-full z-20 opacity-60 "></div>
        {workout && (
          <div className="w-full flex justify-center">
            {images?.map((image) => (
              <Image
                key={image.id}
                src={image.image || ""}
                alt={String(image.exercise) || ""}
                width={300}
                height={300}
                className="object-cover"
              />
            ))}
          </div>
        )}

        <div className="p-5 flex flex-col items-center">
          <p className="font-bold text-5xl font-sans tracking-wider ">
            {translations?.[0].name}
          </p>

          <p className=" text-sm text-primary font-semibold tracking-wider mt-4">
            {category?.name || "N/A"}
          </p>
        </div>
      </div>
      <div className="flex justify-between px-4 mt-10 gap-x-10">
        <Image
          src={Muscles}
          width={500}
          height={100}
          alt="musclesPic"
          className="object-contain"
        />
        <div className="flex flex-col items-center ">
          <p className={`${titleText}`}>Target Areas: </p>

          <div className={`${divStyle} mt-4`}>
            <div className="flex items-center">
              <p
                className={`${text} font-semibold text-md text-muted-foreground`}
              >
                Primary Muscle :
              </p>
              <div className="flex flex-col ml-5 gap-4">
                {(muscles ?? []).length > 0 ? (
                  (muscles ?? []).map((muscle) => (
                    <div key={muscle.id} className="">
                      <p className=" bg-muted/40  shadow-inner px-6 py-2 rounded-lg">
                        {muscle.name || "N/A"}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="bg-muted/40 shadow-inner text-highlight px-6 py-2 rounded-lg">
                    No primary muscle
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center mt-10">
              <p
                className={`${text} font-semibold text-md text-muted-foreground`}
              >
                Secondary Muscle :
              </p>
              <div className="flex flex-col ml-5 gap-4">
                {(muscles_secondary ?? []).length > 0 ? (
                  (muscles_secondary ?? []).map((muscle) => (
                    <div key={muscle.id}>
                      <p className=" bg-muted/40  shadow-inner   px-6 py-2 rounded-lg">
                        {muscle.name || "N/A"}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="bg-muted/40  shadow-inner text-highlight px-6 py-2 rounded-lg">
                    No secondary muscle
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className={`${divStyle}`}>
            <p className={`${titleText} mb-2`}>Description :</p>
            <p className="mt-2 bg-muted/40 font-light tracking-wide shadow-inner px-6 py-2 rounded-lg ">
              {translations?.[0].description.replace(/(<([^>]+)>)/gi, "") ||
                "Keep your back in an upright position ."}
            </p>
          </div>

          <div className={`${divStyle}`}>
            <p className={`${titleText} mb-5`}>Equipment :</p>
            {(equipment ?? []).length > 0 ? (
              (equipment ?? []).map((item) => (
                <div key={item.id}>
                  <p className=" bg-muted/40 shadow-inner  px-6 py-2 rounded-lg">
                    {" "}
                    {item.name}
                  </p>
                </div>
              ))
            ) : (
              <p className="bg-muted/40 shadow-inner text-highlight px-6 py-2 rounded-lg">
                No equipment needed
              </p>
            )}
          </div>

          <Link
            href="/dashboard/workout"
            className="flex bg-primary/60  py-2 rounded-full w-32  justify-center shadow-md hover:bg-primary/70 mt-5"
          >
            <MoveLeft size={20} /> <p className="text-sm ml-2 ">Back</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

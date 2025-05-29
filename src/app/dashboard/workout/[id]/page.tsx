"use client";;
import { use } from "react";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { MoveLeft } from "lucide-react";
import axiosClient from "@/app/services/axiosInstance";
import Link from "next/link";
import { IWorkout } from "@/lib/types";
import Legs from "../../../../assets/legs.jpg";
import Arms from "../../../../assets/arms.jpg";
import Abs from "../../../../assets/abs.jpg";
import Cardio from "../../../../assets/cardio.jpg";
import Shoulder from "../../../../assets/shoulders.jpg";
import Back from "../../../../assets/back.jpg";

export default function Page(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  const client = axiosClient();
  const divStyle = "my-2 py-5 flex flex-col items-center  w-full";
  const titleText = "text-lg font-semibold text-primary";
  const text = "ml-5 font-sans";

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
    muscles,

    muscles_secondary,
    equipment,

    translations,
  } = workout;

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto">
      <div className="relative w-full h-[30rem] rounded-md overflow-hidden">
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
          alt={workout.category?.name || "Workout image"}
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black opacity-50" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <p className="font-bold text-5xl font-sans tracking-wider">
            {translations?.[0].name}
          </p>
        </div>
      </div>
      <div className="flex my-12 ">
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
            className="flex bg-primary/60  py-2  rounded-full w-32  justify-center shadow-md hover:bg-primary/70 mt-5"
          >
            <MoveLeft size={20} /> <p className="text-sm ml-2 ">Back</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

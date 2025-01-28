// `app/page.tsx` is the UI for the `/` URL
"use client";

type Props = {};

import { useEffect, useState } from "react";
import axiosClient from "@/app/services/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import WorkoutCard, { IWorkout } from "@/components/workoutSection/WorkoutCard";

export default function Workout() {
  const client = axiosClient();
  const [workouts, setWorkouts] = useState<IWorkout[]>([]);

  async function getWorkouts(): Promise<any[]> {
    const res = await client.get("/exercises");
    console.log(res);
    setWorkouts(res.data);
    return res.data;
  }

  const query = useQuery({ queryKey: ["workouts"], queryFn: getWorkouts });
  console.log(query.data, "query");

  return (
    <div className="grid grid-cols-4">
      {query.data?.map((workout: IWorkout) => (
        <div key={workout.id}>
          <WorkoutCard
            id={workout.id}
            name={workout.name}
            gifUrl={workout.gifUrl}
          />
        </div>
      ))}
    </div>
  );
}

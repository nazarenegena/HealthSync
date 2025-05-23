"use client";

type Props = {};

import { useEffect, useState } from "react";
import axiosClient from "@/app/services/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import WorkoutCard from "@/components/workoutSection/WorkoutCard";
import { IWorkout } from "@/lib/types";

export default function Workout() {
  const client = axiosClient();

  const [workouts, setWorkouts] = useState<{ results: IWorkout[] }>({
    results: [],
  });

  const [filteredWorkouts, setFilteredWorkouts] = useState("");

  async function getWorkouts(): Promise<{ results: IWorkout[] }> {
    const res = await client.get("/exerciseinfo/");

    setWorkouts(res.data);

    return res.data;
  }

  const query = useQuery({ queryKey: ["workouts"], queryFn: getWorkouts });

  const handlefilteredWorkouts = query.data?.results?.filter(
    (workout) =>
      !filteredWorkouts || workout.category?.name === filteredWorkouts
  );
  return (
    <div className="grid grid-cols-3 gap-6 w-[64rem] px-5">
      <div>
        <button onClick={() => setFilteredWorkouts("")}>All</button>
        <button onClick={() => setFilteredWorkouts("Abs")}>Abs</button>
        <button onClick={() => setFilteredWorkouts("Legs")}>Legs</button>
        <button onClick={() => setFilteredWorkouts("Arms")}>Arms</button>
      </div>

      {handlefilteredWorkouts?.map((workout: IWorkout) => (
        <div key={workout.id}>
          <WorkoutCard workout={workout} />
        </div>
      ))}
    </div>
  );
}

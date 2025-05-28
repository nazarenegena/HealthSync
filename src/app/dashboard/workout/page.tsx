"use client";

import { useState } from "react";
import axiosClient from "@/app/services/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import WorkoutCard from "@/components/workoutSection/WorkoutCard";
import { IWorkout } from "@/lib/types";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
    <div className="flex flex-col items-center ">
      <Tabs defaultValue="all" className="w-full max-w-2xl mb-6 ">
        <TabsList className="w-full flex justify-between shadow-inner bg-muted-foreground/5 p-7 ">
          <TabsTrigger value="all" onClick={() => setFilteredWorkouts("")}>
            All
          </TabsTrigger>
          <TabsTrigger value="abs" onClick={() => setFilteredWorkouts("Abs")}>
            Abs
          </TabsTrigger>
          <TabsTrigger value="legs" onClick={() => setFilteredWorkouts("Legs")}>
            Legs
          </TabsTrigger>
          <TabsTrigger value="arms" onClick={() => setFilteredWorkouts("Arms")}>
            Arms
          </TabsTrigger>
          <TabsTrigger
            value="cardio"
            onClick={() => setFilteredWorkouts("Cardio")}
          >
            Cardio
          </TabsTrigger>
          <TabsTrigger
            value="shoulders"
            onClick={() => setFilteredWorkouts("Shoulders")}
          >
            Shoulders
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-2 items-center gap-y-10 gap-x-6">
        {handlefilteredWorkouts?.map((workout: IWorkout) => (
          <div key={workout.id}>
            <WorkoutCard workout={workout} />
          </div>
        ))}
      </div>
    </div>
  );
}

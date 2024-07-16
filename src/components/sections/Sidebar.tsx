import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

type Props = {};

const Sidebar = (props: Props) => {
  return (
    <div>
      <div>
        <Button asChild className="w-56">
          <Link href="/">Home</Link>
        </Button>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/dashboard/workout">Workout</Link>
        <Link href="/dashboard/schedule">Schedule</Link>
        <Link href="/dashboard/mealplan">Meal Plan</Link>
      </div>
    </div>
  );
};

export default Sidebar;

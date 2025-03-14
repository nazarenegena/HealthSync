"use client";

import React from "react";
import { useRouter } from "next/navigation";

const RecipeSearch = () => {
  const router = useRouter();
  const back = () => {
    router.push("/dashboard/mealplan");
  };
  return (
    <div>
      <p>Search for your receipe</p>
      <button onClick={back}>Back</button>
    </div>
  );
};

export default RecipeSearch;

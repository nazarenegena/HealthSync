"use client";

import React from "react";
import RandomRecipe from "./RandomRecipe";
import { useRouter } from "next/navigation";

const MainRecipeView = () => {
  const router = useRouter();
  const handleNextPage = () => {
    router.push("/dashboard/mealplan/recipes");
    console.log("Next Page");
  };
  return (
    <div>
      <div
        onClick={handleNextPage}
        className="cursor-pointer bg-primary/30 w-80 h-14 flex items-center justify-center rounded-md shadow-md hover:bg-primary/35 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 "
      >
        Explore More Meals
      </div>
      <RandomRecipe />
    </div>
  );
};

export default MainRecipeView;

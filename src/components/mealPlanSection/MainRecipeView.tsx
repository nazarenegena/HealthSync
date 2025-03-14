"use client";

import React from "react";
import RecipeSearch from "./RecipeSearch";
import RandomRecipe from "./RandomRecipe";
import Search from "./Search";
import { useRouter } from "next/navigation";
import RecipeByNutrients from "./RecipeByNutrients";

const MainRecipeView = () => {
  const router = useRouter();
  const handleNextPage = () => {
    router.push("/dashboard/mealplan/recipes");
    console.log("Next Page");
  };
  return (
    <div>
      {/* <RecipeSearch /> */}
      <Search onNextPage={handleNextPage} />
      <RandomRecipe />
      <RecipeByNutrients />
    </div>
  );
};

export default MainRecipeView;

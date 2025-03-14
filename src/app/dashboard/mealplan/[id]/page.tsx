import RecipeByNutrients from "@/components/mealPlanSection/RecipeByNutrients";
import RecipeSearch from "@/components/mealPlanSection/RecipeSearch";
import React from "react";

export default function Page() {
  return (
    <div>
      <RecipeSearch />
      <RecipeByNutrients />
    </div>
  );
}

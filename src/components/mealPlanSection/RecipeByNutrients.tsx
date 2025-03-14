"use client";
import React from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

interface INutrients {
  id: number;
  title: string;
  image: string;
  imageType: string;
  calories: number;
  carbs: string;
  fat: string;
  protein: string;
}

type Props = {};

const RecipeByNutrients = (props: Props) => {
  const fetchMealsByNutrients = async () => {
    const res = await fetch(
      "https://api.spoonacular.com/recipes/random?apiKey=36c1c74aeadf4973939183b2a60cf419",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res?.json();
  };

  const { data, isLoading, error } = useQuery({
    queryFn: async () => await fetchMealsByNutrients(),
    queryKey: ["mealsByNutrients"],
  });

  console.log(data, "new dta");

  if (isLoading) return <p>Loading...</p>;
  if (error) return <div>Sorry There was an Error</div>;

  return (
    <div>
      {/* {data?.results.map((nutrient: INutrients) => (
        <div key={nutrient.id}>
          <div>
            <Image
              width={120}
              height={100}
              src={nutrient.image}
              alt={nutrient.title}
            />
            <p>{nutrient.title}</p>
            <p>{nutrient.calories}</p>
            <p>{nutrient.carbs}</p>
            <p>{nutrient.fat}</p>
            <p>{nutrient.protein}</p>
          </div>
        </div>
      ))} */}
    </div>
  );
};

export default RecipeByNutrients;

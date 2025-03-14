"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export type IRandomRecipeType = {
  id: number;
  image: string;
  title: string;
  sourceName: string;
  sourceUrl: string;
};

type Props = {
  searchId?: string;
};

const RandomRecipe = ({ searchId }: Props) => {
  const fetchReceipe = async () => {
    const res = await fetch(
      "https://api.spoonacular.com/recipes/complexSearch?apiKey=36c1c74aeadf4973939183b2a60cf419",
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
    queryFn: async () => await fetchReceipe(),
    queryKey: ["randomRecipes", searchId],
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <div>Sorry There was an Error</div>;

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mt-6">
        {data?.results.map((randomRecipe: IRandomRecipeType) => (
          <div key={randomRecipe.id}>
            <div>
              <Image
                src={randomRecipe.image}
                alt={randomRecipe.title}
                width={120}
                height={100}
              />
              <p>{randomRecipe.title}</p>
              <p>{randomRecipe.sourceName}</p>
              <a href={randomRecipe.sourceUrl}>View Recipe</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RandomRecipe;

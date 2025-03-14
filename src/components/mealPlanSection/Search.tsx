"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FiSearch } from "react-icons/fi";
import RandomRecipe from "./RandomRecipe";
import { useQuery } from "@tanstack/react-query";

interface IFormInput {
  receipeInput: string | number;
}

interface IFilteredRecipe {
  id: number;
  image: string;
  imageType: string;
  likes: number;
  missedIngredientCount: number;
  missedIngredients: SedIngredient[];
  title: string;
  unusedIngredients: any[];
  usedIngredientCount: number;
  usedIngredients: SedIngredient[];
}

export interface SedIngredient {
  aisle: string;
  amount: number;
  id: number;
  image: string;
  meta: any[];
  name: string;
  original: string;
  originalName: string;
  unit: string;
  unitLong: string;
  unitShort: string;
}

interface Props {
  onNextPage?: () => void;
}

const Search = ({ onNextPage }: Props) => {
  const [queryId, setQueryId] = useState<string>("");
  const [searchedData, setSearchedData] = useState<IFilteredRecipe[]>([]);
  const { register, handleSubmit } = useForm<IFormInput>();

  const fetchInput = async (query: string) => {
    const res = await fetch(
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${query}&apiKey=36c1c74aeadf4973939183b2a60cf419`,
      // `https://api.spoonacular.com/recipes/findByIngredients?apiKey=36c1c74aeadf4973939183b2a60cf419&query=${query}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res?.json();
    setSearchedData(data);
    console.log(data, "myData");
  };

  // const { data, isLoading, error } = useQuery({
  //   queryFn: async () => await fetchInput(),
  //   queryKey: ["randomRecipes", queryId],
  // });

  const onSubmit: SubmitHandler<IFormInput> = (inputData) => {
    console.log(inputData, "inputData");
    const query = String(inputData.receipeInput);

    setQueryId(query);

    fetchInput(query);
  };

  return (
    <div onClick={onNextPage}>
      <form className="relative" onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("receipeInput")}
          type="text"
          placeholder="hungry for ..."
          className="w-1/2 bg-muted-foreground/5 h-14 shadow-inner border border-muted-foreground/10 rounded-full px-10 placeholder:text-muted-foreground/70 focus:outline-none focus:border-primary/40"
        />
        <button type="submit">
          <FiSearch
            className="absolute top-4 left-[29rem] cursor-pointer text-muted-foreground/80 hover:text-primary "
            size={22}
          />
        </button>
      </form>
      <div className="grid grid-cols-3 gap-4">
        {searchedData?.length > 0
          ? searchedData.map((receipe: IFilteredRecipe) => (
              <div key={receipe.id}>
                <Image
                  // https://img.spoonacular.com/recipes/665573-312x231.jpg
                  src={`https://spoonacular.com/recipeImages/${receipe.id}-312x231.jpg`}
                  alt={receipe.title}
                  width={120}
                  height={100}
                />
                <p>{receipe.title}</p>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default Search;

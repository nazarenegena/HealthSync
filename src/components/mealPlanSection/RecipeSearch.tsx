"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { IoReturnDownBack } from "react-icons/io5";

import Search from "./Search";

const RecipeSearch = () => {
  const router = useRouter();
  const back = () => {
    router.push("/dashboard/mealplan");
  };
  return (
    <div className="px-5 flex flex-col items-center  relative h-screen ">
      <Search />
      <div className="flex flex-col mt-80">
        <p className="font-semibold text-muted-foreground/50">
          Your meals will appear soon ...
        </p>
      </div>

      <button
        onClick={back}
        className="flex justify-between w-16 text-sm font-bold absolute bottom-52 right-36 text-primary"
      >
        <IoReturnDownBack size={24} />
        Back
      </button>
    </div>
  );
};

export default RecipeSearch;

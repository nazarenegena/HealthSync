import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { IoStarOutline } from "react-icons/io5";
import { IoStarSharp } from "react-icons/io5";
import { GiShoppingCart } from "react-icons/gi";

type Props = {};

const Help = (props: Props) => {
  const textStyle = "font-semibold text-sm tracking-wider";
  const divStyle =
    "bg-muted py-7  w-80 rounded-md mt-5 shadow-sm cursor-pointer hover:bg-teal-700/25 flex flex-col items-center ";
  const inputStyles =
    "lg:h-10 h-8 w-72 px-2 border border-neutral text-sm font-medium rounded-md outline-none focus:ring-primary/80 focus:border-primary/80";

  return (
    <div className="flex flex-col justify-between items-center mt-8">
      <div className="bg-muted py-7 px-4 w-80 rounded-md mt-7 shadow-sm">
        <div className=" relative flex justify-end gap-10">
          <input
            type="text"
            placeholder="Search for help"
            className={`${inputStyles}`}
          />
          <IoSearchOutline
            size={18}
            className="absolute top-3 right-5 cursor-pointer text-muted-foreground"
          />
        </div>

        <div className="mt-2 ml-4">
          <p className="mt-4 text-sm text-muted-foreground">
            How to cast workouts on TV
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            How to link your Samsung watch ?
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            TV streaming services supported ?
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Can I get a free subscription
          </p>
        </div>
      </div>
      <div className={`${divStyle}`}>
        <p className={`${textStyle}`}>Ask a question</p>
        <p className="mt-2 text-sm text-muted-foreground">
          AI Agent and team can help
        </p>
      </div>

      <div className={`${divStyle} mb-4`}>
        <p className={`${textStyle}`}>Rate Us </p>
        <div className="flex justify-between mt-4 w-32">
          {" "}
          <IoStarSharp className="text-amber-400" />
          <IoStarSharp className="text-amber-400" />
          <IoStarSharp className="text-amber-400" />
          <IoStarSharp className="text-amber-400" />
          <IoStarOutline className="text-muted-foreground" />
        </div>
      </div>
      <div className={`${divStyle} `}>
        <div className="flex justify-evenly items-center ">
          <p className={`${textStyle}`}>Shop Accessories</p>
          <GiShoppingCart
            size={28}
            className="ml-4 text-teal-600"
            strokeWidth={6}
          />
        </div>
      </div>
    </div>
  );
};

export default Help;

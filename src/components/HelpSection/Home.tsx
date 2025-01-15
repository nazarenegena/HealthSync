import React from "react";
import Image from "next/image";
import { IoSearchOutline } from "react-icons/io5";

import smileEmoji from "@/assets/smile.svg";
import { useAuth } from "@/contexts/AuthenticationContext";

type Props = {};

const Home = (props: Props) => {
  const { user } = useAuth();
  const inputStyles =
    "lg:h-10 h-8 w-72 px-2 border border-neutral text-sm text-secondary-foreground font-medium rounded-md outline-none focus:ring-primary/80 focus:border-primary/80";

  return (
    <div className="font-bold text-primary/80 text-3xl flex flex-col items-center justify-center mt-32">
      <div className="flex items-center ">
        <p>hello {user.name} </p>
        <p>
          {" "}
          <Image
            src={smileEmoji}
            alt="smile"
            width={24}
            height={24}
            className="ml-2"
          />
        </p>
      </div>

      <p className="font-bold text-2xl mt-5 text-muted-foreground">
        How can we help ?
      </p>
      <div className=" relative flex justify-end gap-10 mt-20">
        <input
          type="text"
          placeholder="search ..."
          className={`${inputStyles}`}
        />
        <IoSearchOutline
          size={18}
          className="absolute top-3 right-5 cursor-pointer text-muted-foreground"
        />
      </div>
    </div>
  );
};

export default Home;

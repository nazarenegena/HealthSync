import React from "react";
import Image from "next/image";

type Props = {
  icon: string;
  metrics: string;
  title: string;
  margin?: string;
};

const MiniCards = ({ icon, metrics, title, margin }: Props) => {
  return (
    <div
      className={`${margin} bg-primary-foreground dark:bg-muted-foreground/10 w-52 h-24 shadow-md rounded-sm relative pl-10`}
    >
      <Image
        src={icon}
        alt="icon"
        width={40}
        height={40}
        className="absolute top-[-1.3rem]"
      />
      <div className="mt-6">
        <p className="font-medium text-base">{metrics}</p>

        <p className="mt-1 text-muted-foreground/75 text-sm">{title}</p>
      </div>
    </div>
  );
};

export default MiniCards;

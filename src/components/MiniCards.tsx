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
      className={`${margin} bg-primary-foreground dark:bg-muted-foreground/10 w-52 h-32 shadow-md rounded-sm`}
    >
      <Image src={icon} alt="icon" width={10} height={10} />
      <p className="">{title}</p>
      <p>{metrics}</p>
    </div>
  );
};

export default MiniCards;

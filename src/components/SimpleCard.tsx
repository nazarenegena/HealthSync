import React from "react";

type Props = {
  title: string;
  margin?: string;
};

const SimpleCard = ({ title, margin }: Props) => {
  return (
    <div
      className={`${margin} bg-primary-foreground dark:bg-muted-foreground/10 h-36 w-[15rem] border border-muted-foreground/10 rounded-lg`}
    >
      <p>{title}</p>
    </div>
  );
};

export default SimpleCard;

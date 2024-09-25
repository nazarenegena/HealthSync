import React from "react";

type Props = {
  margin?: string;
  children: any;
};

const SimpleCard = ({ children, margin }: Props) => {
  return (
    <div
      className={`${margin} bg-primary-foreground dark:bg-muted-foreground/10 h-36 w-[14rem] border border-muted-foreground/10 rounded-lg`}
    >
      {children}
    </div>
  );
};

export default SimpleCard;

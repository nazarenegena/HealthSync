import React from "react";

type Props = {
  title: string;
  width?: string;
  height?: string;
  margin?: string;
  children: any;
};

const Card = ({ title, width, height, margin, children }: Props) => {
  return (
    <div
      className={`${width} ${height} ${margin} bg-primary-foreground dark:bg-muted-foreground/10 shadow-md rounded-sm`}
    >
      <p>{title}</p>
      {children}
    </div>
  );
};

export default Card;

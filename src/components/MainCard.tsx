import React from "react";

type Props = {
  width?: string;
  height?: string;
  margin?: string;
  children: any;
};

const MainCard = ({ width, height, margin, children }: Props) => {
  return (
    <div
      className={`${width} ${height} ${margin} bg-primary-foreground dark:bg-muted-foreground/10 shadow-md rounded-sm px-6 py-3`}
    >
      {children}
    </div>
  );
};

export default MainCard;

import React from "react";
import { MdMessage } from "react-icons/md";

type Props = {};

const Messages = (props: Props) => {
  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="flex flex-col items-center justify-center mt-40">
        <MdMessage className="text-muted-foreground" size={52} />
        <p className="mt-16 text-muted-foreground text-base">No Messages</p>
        <p className="text-muted-foreground text-sm my-4">
          Messages from the team will be shown here
        </p>
      </div>
      <div className="mt-48 text-sm bg-primary/40  py-3 px-6 rounded-md cursor-pointer">
        <p>Ask a question</p>
      </div>
    </div>
  );
};

export default Messages;

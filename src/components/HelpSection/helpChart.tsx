"use client";

import React from "react";
import { FaHome } from "react-icons/fa";
import { SlQuestion } from "react-icons/sl";
import { TiMessages } from "react-icons/ti";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import Help from "./Help";
import Home from "./Home";
import Messages from "./Messages";

const HelpChart = () => {
  const tabTriggerStyle =
    "flex flex-col items-center cursor-pointer hover:text-primary data-[state=active]:text-primary/80";

  return (
    <Tabs
      className="h-[45rem] bg-white dark:bg-black w-96 absolute right-3 bottom-3 z-20 shadow-lg rounded-md mb-10"
      defaultValue="home"
    >
      <TabsContent value="help" className=" h-[40rem]">
        <Help />
      </TabsContent>
      <TabsContent value="home" className=" h-[40rem]">
        <Home />
      </TabsContent>
      <TabsContent value="messages" className=" h-[40rem]">
        <Messages />
      </TabsContent>
      {/* tabs list */}
      <div className="border-t-0 shadow-inner  mt-6 absolute bottom-0 w-full h-20 bg-white dark:bg-black rounded-b-md">
        <TabsList className="flex justify-between px-10 items-center py-4 bg-primary/5 ">
          <TabsTrigger value="home" className={`${tabTriggerStyle}`}>
            <FaHome size={24} />
            <p className="mt-2 text-xs ">Home</p>
          </TabsTrigger>
          <TabsTrigger value="messages" className={`${tabTriggerStyle}`}>
            <TiMessages size={24} />
            <p className="mt-2 text-xs">Messages</p>
          </TabsTrigger>
          <TabsTrigger value="help" className={`${tabTriggerStyle}`}>
            <SlQuestion size={24} />
            <p className="mt-2 text-xs">Help</p>
          </TabsTrigger>
        </TabsList>
      </div>
    </Tabs>
  );
};

export default HelpChart;

"use client";

import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";

type Props = {};

const CalenderView = (props: Props) => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md"
      />
    </div>
  );
};

export default CalenderView;

"use client";

import React, { useState } from "react";
import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const monthData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 100 },
  { month: "March", desktop: 137 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 54 },
];

const dayData = [
  { day: "Monday", desktop: 186 },
  { day: "Tuesday", desktop: 305 },
  { day: "Wednesday", desktop: 237 },
  { day: "Thursday", desktop: 73 },
  { day: "Friday", desktop: 209 },
  { day: "Saturday", desktop: 214 },
  { day: "Sunday", desktop: 142 },
];

const chartConfig = {
  desktop: {
    label: "Activity",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const toPercent = (decimal: number, fixed: number = 0) =>
  (decimal * 100).toFixed(fixed);

const getPercent = (value: number, total: number) => {
  const ratio = total > 0 ? value / total : 0;
  return parseFloat(toPercent(ratio, 2)); // Return as a number
};

// Calculate total desktop usage
const totalDesktop = monthData.reduce((total, item) => total + item.desktop, 0);

// Map monthData to include desktop percentage using getPercent function
const monthDataWithPercentage = monthData.map((item) => ({
  ...item,
  activity: getPercent(item.desktop, totalDesktop), // Return as number
}));

export function ActivityAreaChart() {
  const [isDropdown, setIsDropdown] = useState(false);
  const arrowStyle = "cursor-pointer text-primary font-bold";
  return (
    // use card header
    <Card className="my-8 h-80">
      <div className="flex justify-between m-4">
        <p className="items-center pb-0">Activity</p>
        <div className="items-center pb-0">
          <div className="flex items-center justify-center">
            <p className="text-muted-foreground/75 text-sm">Weekly</p>

            {!isDropdown ? (
              <MdKeyboardArrowDown
                size={20}
                className={`${arrowStyle} ml-2`}
                onClick={() => setIsDropdown(true)}
              />
            ) : (
              <MdKeyboardArrowUp
                size={20}
                className={`${arrowStyle} ml-2`}
                onClick={() => setIsDropdown(false)}
              />
            )}
          </div>
        </div>
      </div>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={monthDataWithPercentage}
            margin={{
              left: 12,
              right: 12,
              top: 18,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="activity" // Use raw percentage number
              type="natural"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

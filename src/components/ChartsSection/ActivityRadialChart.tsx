"use client";

import { TrendingUp } from "lucide-react";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

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
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

export const description = "A radial chart";

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-3))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-5))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function ActivityRadialChart() {
  return (
    <Card className="flex flex-col w-full h-80 my-8 pb-5">
      <CardHeader className="items-center pb-0">
        <CardDescription>Today Overview</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square ">
          <RadialBarChart data={chartData} innerRadius={40} outerRadius={110}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="browser" />}
            />

            <RadialBar dataKey="visitors" background />
            <ChartLegend
              className=" h-2"
              content={
                <ChartLegendContent
                  nameKey="browser"
                  layout="vertical"
                  iconType="circle"
                  verticalAlign="bottom"
                  align="right"
                />
              }
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

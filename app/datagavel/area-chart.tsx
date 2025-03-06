"use client";

import {TrendingUp} from "lucide-react";
import {Area, AreaChart, CartesianGrid, XAxis, YAxis} from "recharts";

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

type AreaChartProps = {
  summary: string;
  chartData: Array<{
    month: string;
    metric1: number;
    metric2: number;
  }>;
  chartConfig: {
    metric1: {
      label: string;
      color: string;
    };
    metric2: {
      label: string;
      color: string;
    };
  };
};

export function AreaChartComponent({
  chartData,
  chartConfig,
  summary,
}: AreaChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Area Chart - Axes</CardTitle>
        <CardDescription>{summary}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: -20,
              right: 12,
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
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={3}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Area
              dataKey="metric1"
              type="natural"
              fill={chartConfig.metric1.color}
              fillOpacity={0.4}
              stroke={chartConfig.metric1.color}
              stackId="a"
            />
            <Area
              dataKey="metric2"
              type="natural"
              fill={chartConfig.metric2.color}
              fillOpacity={0.4}
              stroke={chartConfig.metric2.color}
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter> */}
    </Card>
  );
}

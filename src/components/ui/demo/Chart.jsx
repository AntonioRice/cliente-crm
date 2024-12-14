"use client";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const baseChartData = [
  { day: "Sun", reservations: 0 },
  { day: "Mon", reservations: 0 },
  { day: "Tues", reservations: 0 },
  { day: "Wed", reservations: 0 },
  { day: "Thu", reservations: 0 },
  { day: "Fri", reservations: 0 },
  { day: "Sat", reservations: 0 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "green",
  },
};

const Chart = ({ week, data }) => {
  const updatedChartData = baseChartData.map((item, index) => ({
    ...item,
    reservations: data[index] || 0,
  }));

  const maxReservations = Math.max(...updatedChartData.map((item) => item.reservations));
  const dynamicDomain = [0, Math.ceil(maxReservations * 1.1)];

  return (
    <Card>
      <CardHeader>
        <CardTitle>7-Day View</CardTitle>
        <CardDescription>Week: {week}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={updatedChartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} stroke="rgba(200, 200, 200, 0.2)" />
            <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={10} tickFormatter={(value) => value.slice(0, 3)} />
            <YAxis tickLine={false} axisLine={false} domain={dynamicDomain} hide />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Line
              dataKey="reservations"
              type="natural"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-desktop)",
              }}
              activeDot={{
                r: 7,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default Chart;

"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface LineChartWidgetProps {
  title: string;
  description?: string;
  data: Record<string, string | number>[];
  dataKey: string;
  xAxisKey: string;
  color?: string;
  height?: number;
  className?: string;
}

export function LineChartWidget({
  title,
  description,
  data,
  dataKey,
  xAxisKey,
  color = "#3b82f6",
  height = 300,
  className = "",
}: LineChartWidgetProps) {
  return (
    <Card className={`w-full ${className}`}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxisKey} />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={2}
              dot={{ fill: color }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default LineChartWidget;
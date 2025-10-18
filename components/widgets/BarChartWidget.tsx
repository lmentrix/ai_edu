"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface BarChartWidgetProps {
  title: string;
  description?: string;
  data: Record<string, string | number>[];
  dataKey: string;
  xAxisKey: string;
  color?: string;
  height?: number;
  className?: string;
}

export function BarChartWidget({
  title,
  description,
  data,
  dataKey,
  xAxisKey,
  color = "#10b981",
  height = 300,
  className = "",
}: BarChartWidgetProps) {
  return (
    <Card className={`w-full ${className}`}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxisKey} />
            <YAxis />
            <Tooltip />
            <Bar dataKey={dataKey} fill={color} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default BarChartWidget;
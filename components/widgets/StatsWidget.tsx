"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatItem {
  title: string;
  value: string | number;
  description?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  color?: string;
}

interface StatsWidgetProps {
  title: string;
  description?: string;
  stats: StatItem[];
  className?: string;
}

export function StatsWidget({
  title,
  description,
  stats,
  className = "",
}: StatsWidgetProps) {
  const getTrendIcon = (trend: "up" | "down" | "neutral") => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTrendColor = (trend: "up" | "down" | "neutral") => {
    switch (trend) {
      case "up":
        return "text-green-600 bg-green-50";
      case "down":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg bg-gray-50/50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
                {stat.trend && (
                  <Badge variant="outline" className={getTrendColor(stat.trend)}>
                    <div className="flex items-center gap-1">
                      {getTrendIcon(stat.trend)}
                      {stat.trendValue}
                    </div>
                  </Badge>
                )}
              </div>
              <div className="text-2xl font-bold" style={{ color: stat.color || "#1f2937" }}>
                {stat.value}
              </div>
              {stat.description && (
                <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default StatsWidget;
"use client";

import React from "react";
import {
  PieChart, Pie, Cell,
  BarChart, Bar,
  LineChart, Line,
  AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export type ChartType = 'pie' | 'bar' | 'line' | 'area' | 'doughnut';

interface ChartDisplayProps {
  title?: string;
  type: ChartType;
  data: any[];
  dataKeys: { name: string; key: string }[];
  colors?: string[];
  xAxisKey?: string;
}

const DEFAULT_COLORS = ['#2563eb', '#16a34a', '#dc2626', '#ca8a04', '#9333ea', '#0891b2'];

export function ChartDisplay({ title, type, data, dataKeys, colors = DEFAULT_COLORS, xAxisKey = "name" }: ChartDisplayProps) {
  
  const renderChart = (): React.ReactElement => {
    switch (type) {
      case 'pie':
      case 'doughnut':
        return (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={type === 'doughnut' ? 60 : 0}
              outerRadius={80}
              paddingAngle={type === 'doughnut' ? 5 : 0}
              dataKey={dataKeys[0]?.key || "value"}
              nameKey={xAxisKey}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        );
      case 'bar':
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey={xAxisKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            {dataKeys.map((dk, i) => (
              <Bar key={dk.key} dataKey={dk.key} name={dk.name} fill={colors[i % colors.length]} radius={[4, 4, 0, 0]} />
            ))}
          </BarChart>
        );
      case 'line':
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey={xAxisKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            {dataKeys.map((dk, i) => (
              <Line key={dk.key} type="monotone" dataKey={dk.key} name={dk.name} stroke={colors[i % colors.length]} strokeWidth={2} />
            ))}
          </LineChart>
        );
      case 'area':
        return (
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey={xAxisKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            {dataKeys.map((dk, i) => (
              <Area key={dk.key} type="monotone" dataKey={dk.key} name={dk.name} fill={colors[i % colors.length]} stroke={colors[i % colors.length]} fillOpacity={0.3} />
            ))}
          </AreaChart>
        );
      default:
        return <div />;
    }
  };

  return (
    <Card>
      {title && (
        <CardHeader>
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <div className="h-[300px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export default ChartDisplay;

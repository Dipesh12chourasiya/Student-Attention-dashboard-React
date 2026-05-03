import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe", "#dbeafe"];

//  Tooltip
const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    const { subject, avg } = payload[0].payload;

    return (
      <div className="bg-white border rounded-lg shadow-md p-2 text-sm">
        <p className="font-semibold text-black">{subject}</p>
        <p className="text-blue-600">Avg: {avg}%</p>
      </div>
    );
  }
  return null;
};

const PieChartComponent = ({ data = [] }) => {

  //  FIX: process data properly
  const chartData = useMemo(() => {
    if (!data.length) return [];

    let stats = [...data];

    // 1️ Sort
    stats.sort((a, b) => b.avg - a.avg);

    // 2️ Limit to top 7
    if (stats.length > 7) {
      const top = stats.slice(0, 4);
      const others = stats.slice(4);

      const othersAvg =
        others.reduce((sum, s) => sum + s.avg, 0) /
        others.length;

      stats = [
        ...top,
        { subject: "Others", avg: Math.round(othersAvg) },
      ];
    }

    return stats;
  }, [data]);

  //  Empty state
  if (!chartData.length) {
    return (
      <div className="h-80 flex items-center justify-center text-gray-500">
        No data available
      </div>
    );
  }

  return (
    <div className="w-full h-80">
      <ResponsiveContainer>
        <PieChart>

          <Pie
            data={chartData}
            dataKey="avg"
            nameKey="subject"
            cx="50%"
            cy="50%"
            outerRadius={100}
            innerRadius={50}
            paddingAngle={3}
          >
            {chartData.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip content={<CustomTooltip />} />
          <Legend />

        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;
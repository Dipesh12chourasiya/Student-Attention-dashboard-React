import React, { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const LineChartComponent = ({ data = [] }) => {
  const [range, setRange] = useState(7);

  const filteredData = useMemo(() => {
    if (!data.length) return [];

    const today = new Date();

    const pastDate = new Date();
    pastDate.setDate(today.getDate() - range);

    return data.filter((item) => {
      const d = new Date(item.date);
      return d >= pastDate && d <= today;
    });
  }, [data, range]);

  return (
    <div className="w-full h-96">

      {/* Range Selector */}
      <div className="flex justify-end gap-2 mb-4">
        {[7, 14, 30].map((r) => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className={`px-3 py-1 rounded-lg text-sm border ${
              range === r
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            }`}
          >
            {r}d
          </button>
        ))}
      </div>

      <ResponsiveContainer>
        <LineChart data={filteredData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="attention"
            stroke="#3b82f6"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;
import React, { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

// 🔥 format date for input (YYYY-MM-DD)
const formatInputDate = (date) => {
  return new Date(date).toISOString().split("T")[0];
};

const LineChartComponent = ({ data = [] }) => {
  // 🔥 default = last 7 days
  const today = new Date();
  const last7Days = new Date();
  last7Days.setDate(today.getDate() - 6);

  const [startDate, setStartDate] = useState(formatInputDate(last7Days));
  const [endDate, setEndDate] = useState(formatInputDate(today));

  // 🔥 FILTER DATA
  const filteredData = useMemo(() => {
    if (!data.length) return [];

    return data.filter((item) => {
      const d = new Date(item.date);
      return d >= new Date(startDate) && d <= new Date(endDate);
    });
  }, [data, startDate, endDate]);

  return (
    <div className="space-y-4">

      {/* 🔥 DATE PICKER */}
      <div className="flex flex-wrap gap-3 items-center">
        <div>
          <label className="text-sm text-gray-600">From</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded px-2 py-1 ml-2"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">To</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded px-2 py-1 ml-2"
          />
        </div>
      </div>

      {/* 🔥 CHART */}
      <div className="w-full h-80">
        {filteredData.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            No data in selected range
          </div>
        ) : (
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
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default LineChartComponent;
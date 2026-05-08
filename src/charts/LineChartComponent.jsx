import React, { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

import {
  CalendarDays,
  TrendingUp,
} from "lucide-react";

// Format date for input
const formatInputDate = (date) => {
  return new Date(date)
    .toISOString()
    .split("T")[0];
};

const LineChartComponent = ({ data = [] }) => {

  // Default = last 7 days
  const today = new Date();

  const last7Days = new Date();

  last7Days.setDate(today.getDate() - 6);

  const [startDate, setStartDate] =
    useState(formatInputDate(last7Days));

  const [endDate, setEndDate] =
    useState(formatInputDate(today));

  // Filter Data
  const filteredData = useMemo(() => {

    if (!data.length) return [];

    return data.filter((item) => {

      const d = new Date(item.date);

      return (
        d >= new Date(startDate) &&
        d <= new Date(endDate)
      );
    });

  }, [data, startDate, endDate]);

  // Average Attention
  const averageAttention =
    filteredData.length > 0
      ? Math.round(
          filteredData.reduce(
            (sum, item) =>
              sum + item.attention,
            0
          ) / filteredData.length
        )
      : 0;

  return (
    <div className="
      bg-white
      border border-gray-200
      rounded-3xl
      shadow-sm
      overflow-hidden
    ">

      {/* Header */}
      <div className="
        flex flex-col lg:flex-row
        lg:items-center
        lg:justify-between
        gap-5
        px-5 sm:px-6
        py-5
        border-b border-gray-100
      ">

        {/* Left */}
        <div>

          <div className="flex items-center gap-3">

            <div className="
              w-12 h-12
              rounded-2xl
              bg-blue-100
              flex items-center justify-center
            ">
              <TrendingUp className="text-blue-600" />
            </div>

            <div>
              <h2 className="
                text-xl
                sm:text-2xl
                font-bold
                text-gray-800
              ">
                Attention Trend
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Monitor daily attention performance
              </p>
            </div>
          </div>
        </div>

        {/* Right Stats */}
        <div className="
          bg-blue-50
          border border-blue-100
          rounded-2xl
          px-5 py-3
          min-w-[140px]
        ">

          <p className="text-sm text-blue-600">
            Average Attention
          </p>

          <h3 className="
            text-3xl
            font-bold
            text-blue-700
            mt-1
          ">
            {averageAttention}%
          </h3>
        </div>
      </div>

      {/* Filters */}
      <div className="
        px-5 sm:px-6
        py-5
        flex flex-col sm:flex-row
        gap-4
        border-b border-gray-100
      ">

        {/* From */}
        <div className="flex-1">

          <label className="
            flex items-center gap-2
            text-sm font-medium
            text-gray-600
            mb-2
          ">
            <CalendarDays size={16} />
            From Date
          </label>

          <input
            type="date"
            value={startDate}
            onChange={(e) =>
              setStartDate(e.target.value)
            }
            className="
              w-full
              border border-gray-200
              rounded-xl
              px-4 py-3
              bg-gray-50
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              focus:border-transparent
              transition
            "
          />
        </div>

        {/* To */}
        <div className="flex-1">

          <label className="
            flex items-center gap-2
            text-sm font-medium
            text-gray-600
            mb-2
          ">
            <CalendarDays size={16} />
            To Date
          </label>

          <input
            type="date"
            value={endDate}
            onChange={(e) =>
              setEndDate(e.target.value)
            }
            className="
              w-full
              border border-gray-200
              rounded-xl
              px-4 py-3
              bg-gray-50
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              focus:border-transparent
              transition
            "
          />
        </div>
      </div>

      {/* Chart */}
      <div className="p-4 sm:p-6">

        <div className="
          w-full
          h-[320px]
          sm:h-[400px]
        ">

          {filteredData.length === 0 ? (

            <div className="
              h-full
              flex flex-col
              items-center justify-center
              text-center
            ">

              <div className="
                w-16 h-16
                rounded-full
                bg-gray-100
                flex items-center justify-center
                mb-4
              ">
                📈
              </div>

              <h3 className="
                text-lg font-semibold
                text-gray-700
              ">
                No Data Found
              </h3>

              <p className="
                text-sm text-gray-500 mt-1
              ">
                No attention data available
                in selected date range.
              </p>
            </div>

          ) : (

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <AreaChart data={filteredData}>

                <defs>
                  <linearGradient
                    id="colorAttention"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="#3b82f6"
                      stopOpacity={0.3}
                    />

                    <stop
                      offset="95%"
                      stopColor="#3b82f6"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e5e7eb"
                  vertical={false}
                />

                <XAxis
                  dataKey="date"
                  tick={{
                    fontSize: 12,
                    fill: "#6b7280",
                  }}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  domain={[0, 100]}
                  tick={{
                    fontSize: 12,
                    fill: "#6b7280",
                  }}
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip
                  contentStyle={{
                    borderRadius: "16px",
                    border: "none",
                    boxShadow:
                      "0 10px 30px rgba(0,0,0,0.1)",
                  }}
                />

                {/* Area */}
                <Area
                  type="monotone"
                  dataKey="attention"
                  stroke="none"
                  fillOpacity={1}
                  fill="url(#colorAttention)"
                />

                {/* Line */}
                <Line
                  type="monotone"
                  dataKey="attention"
                  stroke="#2563eb"
                  strokeWidth={4}
                  dot={{
                    r: 4,
                    strokeWidth: 2,
                    fill: "#fff",
                  }}
                  activeDot={{
                    r: 7,
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default LineChartComponent;
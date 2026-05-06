import React from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import Card from "../components/ui/Card";

import AnalyticsContainer from "../features/analytics/AnalyticsContainer";

import LineChartComponent from "../charts/LineChartComponent";
import PieChartComponent from "../charts/PieChartComponent";

import { useAuth } from "../context/AuthContext"; 

const Analytics = () => {
  const { userData } = useAuth(); 

  return (
    <DashboardLayout
      title="Analytics"
      userName={userData?.username || "User"}  
    >

      <AnalyticsContainer>
        {({
          totalSessions,
          avgAttention,
          streak,
          bestFocus,
          trendData,
          subjectStats,
          weakestSubject,
        }) => {

          return (
            <div className="space-y-6">

              {/* Top Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                <Card title="Total Sessions">
                  <p className="text-2xl font-bold">{totalSessions}</p>
                </Card>

                <Card title="Avg Attention">
                  <p className="text-2xl font-bold">
                    {avgAttention}%
                  </p>
                </Card>

                <Card title="Study Streak">
                  <p className="text-2xl font-bold">
                    {streak} days 🔥
                  </p>
                </Card>

                <Card title="Best Focus Time">
                  <p className="text-lg font-semibold capitalize">
                    {bestFocus?.time || "N/A"}
                  </p>
                </Card>

              </div>

              {/* Trend Chart */}
              <Card title="Attention Trend">
                <LineChartComponent data={trendData} />
              </Card>

              {/* Subject Analysis */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                <Card title="Subject Performance">
                  <PieChartComponent data={subjectStats} />
                </Card>

                <Card title="Weakest Subject">
                  {weakestSubject ? (
                    <div className="text-center py-10">
                      <p className="text-xl font-bold text-red-500">
                        {weakestSubject.subject}
                      </p>
                      <p className="text-gray-600">
                        Avg Attention: {weakestSubject.avg}%
                      </p>
                    </div>
                  ) : (
                    <p className="text-gray-500">No data</p>
                  )}
                </Card>

              </div>

            </div>
          );
        }}
      </AnalyticsContainer>

    </DashboardLayout>
  );
};

export default Analytics;
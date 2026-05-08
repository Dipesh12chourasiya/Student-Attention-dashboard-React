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
    <DashboardLayout title="Analytics" userName={userData?.username || "User"}>
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
                  <p className="text-2xl font-bold">{avgAttention}%</p>
                </Card>

                <Card title="Study Streak">
                  <p className="text-2xl font-bold">{streak} days 🔥</p>
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
                    <div className="relative overflow-hidden rounded-3xl border border-red-100 bg-gradient-to-br from-red-50 to-white p-6">
                      {/* Background Glow */}
                      <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-100 rounded-full blur-3xl opacity-40" />

                      {/* Content */}
                      <div className="relative z-10">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-semibold mb-4">
                          ⚠ Needs Improvement
                        </div>

                        {/* Subject */}
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                          {weakestSubject.subject}
                        </h2>

                        {/* Attention */}
                        <div className="mt-5">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm text-gray-500">
                              Average Attention
                            </p>

                            <span className="text-lg font-bold text-red-500">
                              {weakestSubject.avg}%
                            </span>
                          </div>

                          {/* Progress Bar */}
                          <div className="w-full h-3 bg-red-100 rounded-full overflow-hidden">
                            <div
                              className="
                h-full
                rounded-full
                bg-gradient-to-r
                from-red-400
                to-red-600
                transition-all
                duration-500
              "
                              style={{
                                width: `${weakestSubject.avg}%`,
                              }}
                            />
                          </div>
                        </div>

                        {/* Insight */}
                        <div className="mt-5 bg-white/70 backdrop-blur-sm border border-red-100 rounded-2xl p-4">
                          <p className="text-sm text-gray-600 leading-relaxed">
                            Attention levels are comparatively lower in{" "}
                            <span className="font-semibold text-red-500">
                              {weakestSubject.subject}
                            </span>
                            . More focused study sessions may help improve
                            consistency.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                        📚
                      </div>

                      <p className="text-lg font-semibold text-gray-700">
                        No Data Available
                      </p>

                      <p className="text-sm text-gray-500 mt-1">
                        Weakest subject analytics will appear here.
                      </p>
                    </div>
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

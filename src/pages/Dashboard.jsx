import React from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import Card from "../components/ui/Card";
import DashboardContainer from "../features/dashboard/DashboardContainer";

import LineChartComponent from "../charts/LineChartComponent";
import PieChartComponent from "../charts/PieChartComponent";
import { getDailyTrend, getSubjectStats } from "../utils/analytics";

import CalendarView from "../features/dashboard/CalendarView";

const Dashboard = () => {
  return (
    <DashboardLayout title="Dashboard" userName="User">
      <DashboardContainer>
        {({
          sessions, // ✅ get sessions here
          totalSessions,
          avgAttention,
          streak,
          bestFocus,
        }) => {

          const trendData = getDailyTrend(sessions);
          const subjectData = getSubjectStats(sessions);

          return (
            <div className="space-y-6">

              {/* Top Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                <Card title="Total Sessions">
                  <p className="text-2xl font-bold text-black">
                    {totalSessions}
                  </p>
                </Card>

                <Card title="Avg Attention">
                  <p className="text-2xl font-bold text-black">
                    {avgAttention}%
                  </p>
                </Card>

                <Card title="Study Streak">
                  <p className="text-2xl font-bold text-black">
                    {streak} days 🔥
                  </p>
                </Card>

                <Card title="Best Focus Time">
                  <p className="text-lg font-semibold text-black capitalize">
                    {bestFocus?.time || "N/A"}
                  </p>
                </Card>

              </div>

              {/* Calender */}
              <Card title="Calendar">
                  <CalendarView sessions={sessions} /> 
              </Card>

              {/* Charts */}
              {/* <Card title="Attention Trends">
                <LineChartComponent data={trendData} />
              </Card>

              <Card title="Subject Performance">
                <PieChartComponent data={subjectData} />
              </Card> */}

            </div>
          );
        }}
      </DashboardContainer>
    </DashboardLayout>
  );
};

export default Dashboard;
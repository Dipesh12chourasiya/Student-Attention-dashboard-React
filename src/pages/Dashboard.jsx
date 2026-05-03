import React from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import Card from "../components/ui/Card";
import DashboardContainer from "../features/dashboard/DashboardContainer";

import { useAuth } from "../context/AuthContext";

import CalendarView from "../features/dashboard/CalendarView";

const Dashboard = () => {
  const { userData } = useAuth();

  return (
    <DashboardLayout
      title="Dashboard"
      userName={userData?.username || "User"}   // ✅ REAL NAME
    >
      <DashboardContainer>
        {({
          sessions,
          totalSessions,
          avgAttention,
          streak,
          bestFocus,
        }) => {
          return (
            <div className="space-y-6">

              {/* Stats */}
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

              {/* Calendar */}
              <Card title="Calendar">
                <CalendarView sessions={sessions} />
              </Card>

            </div>
          );
        }}
      </DashboardContainer>
    </DashboardLayout>
  );
};

export default Dashboard;
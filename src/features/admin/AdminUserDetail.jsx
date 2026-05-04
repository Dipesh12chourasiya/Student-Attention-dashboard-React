import React from "react";
import { useParams, useLocation } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";
import Card from "../../components/ui/Card";
import SessionList from "../../components/session/SessionList";

import DashboardContainer from "../../features/dashboard/DashboardContainer";

const AdminUserDetail = () => {
  const { uid } = useParams();
  const location = useLocation();

  const user = location.state?.user;

  return (
    <DashboardLayout
      title="User Details"
      userName={user?.username || "Admin"}
    >
      <DashboardContainer userId={uid}>
        {({
          sessions = [],
          totalSessions,
          avgAttention,
          streak,
        }) => {

          const recentSessions = [...sessions]
            .sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime))
            .slice(0, 5);

          return (
            <div className="space-y-6">

              {/*  USER INFO */}
              <Card>
                <div className="flex items-center gap-4">

                  <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
                    {user?.username?.charAt(0)?.toUpperCase() || "U"}
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-black">
                      {user?.username}
                    </h2>
                    <p className="text-gray-600">
                      {user?.email}
                    </p>
                  </div>

                </div>
              </Card>

              {/*  STATS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <Card title="Total Sessions">
                  <p className="text-2xl font-bold">{totalSessions}</p>
                </Card>

                <Card title="Avg Attention">
                  <p className="text-2xl font-bold">{avgAttention}%</p>
                </Card>

                <Card title="Streak">
                  <p className="text-2xl font-bold">{streak} days 🔥</p>
                </Card>

              </div>

              {/*  RECENT SESSIONS */}
              <Card title="Recent Sessions">
                <SessionList sessions={recentSessions} />
              </Card>

            </div>
          );
        }}
      </DashboardContainer>
    </DashboardLayout>
  );
};

export default AdminUserDetail;
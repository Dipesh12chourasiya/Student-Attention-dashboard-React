import React from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import Card from "../components/ui/Card";
import SessionList from "../components/session/SessionList";

import DashboardContainer from "../features/dashboard/DashboardContainer";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, userData, logout } = useAuth();

  return (
    <DashboardLayout
      title="Profile"
      userName={userData?.username || "User"}
    >
      <DashboardContainer>
        {({
          sessions = [],
          totalSessions,
          avgAttention,
          streak,
        }) => {

          // ✅ Sort safely (important fix)
          const recentSessions = [...sessions]
            .sort((a, b) => {
              const d1 = new Date(a?.dateTime || 0);
              const d2 = new Date(b?.dateTime || 0);
              return d2 - d1;
            })
            .slice(0, 5);

          return (
            <div className="space-y-6">

              {/*  Profile Info */}
              <Card>
                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-4">

                    {/* Avatar */}
                    <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-bold">
                      {userData?.username
                        ?.charAt(0)
                        ?.toUpperCase() || "U"}
                    </div>

                    {/* Info */}
                    <div>
                      <h2 className="text-xl font-bold text-black">
                        {userData?.username || "User"}
                      </h2>
                      <p className="text-gray-600">
                        {user?.email || "No email"}
                      </p>
                    </div>

                  </div>

                  {/* Logout */}
                  <button
                    onClick={logout}
                    className="text-red-500 text-sm font-medium hover:underline"
                  >
                    Logout
                  </button>

                </div>
              </Card>

              {/*  Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

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

              </div>

              {/*  Recent Sessions */}
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

export default Profile;
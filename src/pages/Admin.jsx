import React from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import Card from "../components/ui/Card";

import AdminContainer from "../features/admin/AdminContainer";
import UserTable from "../features/admin/UserTable";

import { useAuth } from "../context/AuthContext";
import DashboardSkeleton from "../components/skeletons/DashboardSkeleton";

const Admin = () => {
  const { userData } = useAuth();

  return (
    <DashboardLayout
      title="Admin Panel"
      userName={userData?.username}
    >
      <AdminContainer>
        {({
          loading,
          users,
          totalUsers,
          activeUsers,
          newUsers,
        }) => {

          if (loading) return <DashboardSkeleton />;
          

          return (
            <div className="space-y-6">

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <Card title="Total Users">{totalUsers}</Card>
                <Card title="Active Users">{activeUsers}</Card>
                <Card title="New Users">{newUsers}</Card>
              </div>

              {/* Table */}
              <Card title="User Management">
                <UserTable users={users} />
              </Card>

            </div>
          );
        }}
      </AdminContainer>
    </DashboardLayout>
  );
};

export default Admin;
import React from "react";
import Skeleton from "../ui/Skeleton";

const DashboardSkeleton = () => {
  return (
    <div className="space-y-6">

      {/*  Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="p-4 bg-white rounded-xl shadow space-y-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-16" />
          </div>
        ))}
      </div>

      {/*  Chart */}
      <div className="p-4 bg-white rounded-xl shadow space-y-4">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-64 w-full" />
      </div>

      {/*  Calendar */}
      <div className="p-4 bg-white rounded-xl shadow space-y-4">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-64 w-full" />
      </div>

    </div>
  );
};

export default DashboardSkeleton;
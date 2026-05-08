import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

import DashboardLayout from "../components/layout/DashboardLayout";
import Card from "../components/ui/Card";
import { getSessionById } from "../services/sessionService";
import { useAuth } from "../context/AuthContext";
import DashboardSkeleton from "../components/skeletons/DashboardSkeleton";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

import {
  CalendarDays,
  Clock3,
  Timer,
  Brain,
  Camera,
  ScanFace,
  FileText,
} from "lucide-react";

const SessionDetail = () => {
  const { id } = useParams();
  const location = useLocation();

  const { user } = useAuth();

  const [session, setSession] = useState(
    location.state?.session || null
  );

  const [loading, setLoading] = useState(!session);

  useEffect(() => {
    if (session) {
      setLoading(false);
      return;
    }

    const userId =
      location.state?.userId || session?.userId;

    if (!userId || !id) {
      setLoading(false);
      return;
    }

    const fetchSession = async () => {
      try {
        const data = await getSessionById(userId, id);
        setSession(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [id, user, session]);

  if (loading) {
    return (
      <DashboardLayout title="Loading...">
        <DashboardSkeleton />
      </DashboardLayout>
    );
  }

  if (!session) {
    return (
      <div className="p-6 text-red-500">
        Session not found
      </div>
    );
  }

  const attentive = session.attentionPercent || 0;
  const inattentive = 100 - attentive;

  const chartData = [
    {
      name: "Attentive",
      value: attentive,
    },
    {
      name: "Inattentive",
      value: inattentive,
    },
  ];

  const COLORS = ["#2563eb", "#f59e0b"];

  return (
    <DashboardLayout
      title={session.title || "Session"}
    >
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Top Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-6 sm:p-8 shadow-lg text-white">

          <h1 className="text-2xl sm:text-3xl font-bold">
            {session.title || "Study Session"}
          </h1>

          <p className="text-blue-100 mt-2">
            Detailed analytics and attention insights
          </p>

          <div className="flex flex-wrap gap-3 mt-5">

            <div className="bg-white/15 backdrop-blur-md px-4 py-2 rounded-xl text-sm flex items-center gap-2">
              <CalendarDays size={16} />
              {session.dateTime}
            </div>

            <div className="bg-white/15 backdrop-blur-md px-4 py-2 rounded-xl text-sm flex items-center gap-2">
              <Timer size={16} />
              {session.duration}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* LEFT */}
          <div className="xl:col-span-2 space-y-6">

            {/* Session Summary */}
            <Card>
              <div className="p-2">

                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">
                    <Brain className="text-blue-600" />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-gray-800">
                      Session Summary
                    </h2>

                    <p className="text-gray-500 text-sm">
                      Overview of the session performance
                    </p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

                  <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <ScanFace size={16} />
                      Faces
                    </div>

                    <h3 className="text-2xl font-bold mt-2 text-gray-800">
                      {session.totalFaces}
                    </h3>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <Camera size={16} />
                      Frames
                    </div>

                    <h3 className="text-2xl font-bold mt-2 text-gray-800">
                      {session.totalFrames}
                    </h3>
                  </div>

                  <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
                    <div className="text-blue-600 text-sm">
                      Attention
                    </div>

                    <h3 className="text-2xl font-bold mt-2 text-blue-700">
                      {attentive}%
                    </h3>
                  </div>

                  <div className="bg-orange-50 rounded-2xl p-4 border border-orange-100">
                    <div className="text-orange-600 text-sm">
                      Inattentive
                    </div>

                    <h3 className="text-2xl font-bold mt-2 text-orange-600">
                      {inattentive}%
                    </h3>
                  </div>
                </div>

                {/* Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">

                  <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <Clock3 size={16} />
                      Start Time
                    </div>

                    <p className="text-lg font-semibold mt-2 text-gray-800">
                      {session.startTime}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <Clock3 size={16} />
                      End Time
                    </div>

                    <p className="text-lg font-semibold mt-2 text-gray-800">
                      {session.endTime}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Notes */}
            <Card>
              <div className="p-2">

                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center">
                    <FileText className="text-indigo-600" />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-gray-800">
                      Session Notes
                    </h2>

                    <p className="text-gray-500 text-sm">
                      Personal notes and observations
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 text-gray-700 leading-relaxed">
                  {session.notes || "No notes added"}
                </div>
              </div>
            </Card>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">

            {/* Pie Chart */}
            <Card>
              <div className="p-2">

                <h2 className="text-xl font-bold text-gray-800 mb-1">
                  Attention Analytics
                </h2>

                <p className="text-sm text-gray-500 mb-6">
                  Visual representation of attention tracking
                </p>

                <div className="h-[320px]">
                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={100}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {chartData.map(
                          (entry, index) => (
                            <Cell
                              key={index}
                              fill={COLORS[index]}
                            />
                          )
                        )}
                      </Pie>

                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Attention Score */}
                <div className="mt-4 bg-blue-50 border border-blue-100 rounded-2xl p-4 text-center">

                  <p className="text-sm text-blue-600">
                    Overall Attention Score
                  </p>

                  <h2 className="text-4xl font-bold text-blue-700 mt-2">
                    {attentive}%
                  </h2>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SessionDetail;
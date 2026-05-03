import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

import DashboardLayout from "../components/layout/DashboardLayout";
import Card from "../components/ui/Card";
import { getSessionById } from "../services/sessionService";
import { useAuth } from "../context/AuthContext"; 

const SessionDetail = () => {
  const { id } = useParams();
  const location = useLocation();



  const { user } = useAuth(); //  get logged in user

  const [session, setSession] = useState(
    location.state?.session || null
  );

  const [loading, setLoading] = useState(!session);

  useEffect(() => {
    //  if already passed → no need to fetch
    if (session) {
      setLoading(false);
      return;
    }

    //  fallback to logged-in user
      const userId = location.state?.userId || session?.userId;

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
    return <div className="p-6">Loading...</div>;
  }

  if (!session) {
    return (
      <div className="p-6 text-red-500">
        Session not found
      </div>
    );
  }

  return (
    <DashboardLayout title={session.title || "Session"}>
      <div className="space-y-4">

        <Card>
          <p><strong>Date:</strong> {session.dateTime}</p>
          <p><strong>Duration:</strong> {session.duration}</p>
          <p><strong>Start:</strong> {session.startTime}</p>
          <p><strong>End:</strong> {session.endTime}</p>
        </Card>

        <Card>
          <p><strong>Faces:</strong> {session.totalFaces}</p>
          <p><strong>Frames:</strong> {session.totalFrames}</p>
          <p><strong>Attention:</strong> {session.attentionPercent}%</p>
          <p><strong>Inattentive:</strong> {100 - session.attentionPercent}%</p>
        </Card>

        <Card title="Notes">
          <p>{session.notes || "No notes"}</p>
        </Card>

      </div>
    </DashboardLayout>
  );
};

export default SessionDetail;
import React from "react";
import { useSessions } from "../../hooks/useSessions";
import {
  getAverageAttention,
  getStreak,
  getBestFocusTime,
} from "../../utils/analytics";
import DashboardSkeleton from "../../components/skeletons/DashboardSkeleton";

const DashboardContainer = ({ children, userId }) => {
  const { sessions = [], loading } = useSessions(userId);

  if (loading) {
    return <DashboardSkeleton />;
  }

  const totalSessions = sessions.length;
  const avgAttention = getAverageAttention(sessions);
  const streak = getStreak(sessions);
  const bestFocus = getBestFocusTime(sessions);

  return children({
    sessions,
    totalSessions,
    avgAttention,
    streak,
    bestFocus,
  });
};

export default DashboardContainer; 
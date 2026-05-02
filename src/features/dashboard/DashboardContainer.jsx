import React from "react";
import { useSessions } from "../../hooks/useSessions";
import {
  getAverageAttention,
  getStreak,
  getBestFocusTime,
} from "../../utils/analytics";

const DashboardContainer = ({ children }) => {
  const { sessions, loading } = useSessions();
  console.log(sessions)

  if (loading) {
    return <p className="p-6">Loading dashboard...</p>;
  }

  //  Analytics
  const totalSessions = sessions.length;
  const avgAttention = getAverageAttention(sessions);
  const streak = getStreak(sessions);
  const bestFocus = getBestFocusTime(sessions);

  // pass everything to UI
  return children({
    sessions,
    totalSessions,
    avgAttention,
    streak,
    bestFocus,
  });
};

export default DashboardContainer;
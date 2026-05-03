import React from "react";
import {
  getAverageAttention,
  getStreak,
  getBestFocusTime,
  getDailyTrend,
  getSubjectStats,
  getWeakestSubject,
} from "../../utils/analytics";

import { useSessions } from "../../hooks/useSessions";

const AnalyticsContainer = ({ children }) => {
  const { sessions, loading } = useSessions();

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  //  Calculations
  const totalSessions = sessions.length;
  const avgAttention = getAverageAttention(sessions);
  const streak = getStreak(sessions);
  const bestFocus = getBestFocusTime(sessions);
  const trendData = getDailyTrend(sessions);
  const subjectStats = getSubjectStats(sessions);
  const weakestSubject = getWeakestSubject(sessions);

  return children({
    sessions,
    totalSessions,
    avgAttention,
    streak,
    bestFocus,
    trendData,
    subjectStats,
    weakestSubject,
  });
};

export default AnalyticsContainer;
import React, { useState, useMemo } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import {
  getDateString,
  parseCustomDate,
} from "../../utils/dateUtils";

import SessionList from "../../components/session/SessionList";

const CalendarView = ({ sessions = [] }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // ✅ Selected date (LOCAL safe)
  const selectedDateStr = getDateString(selectedDate);

  // ✅ Create Set of session dates (FIXED parsing)
  const sessionDatesSet = useMemo(() => {
    return new Set(
      sessions
        .map((s) => {
          const parsed = parseCustomDate(s.dateTime);
          return parsed ? getDateString(parsed) : null;
        })
        .filter(Boolean)
    );
  }, [sessions]);

  // ✅ Filter sessions for selected day (FIXED)
  const sessionsForDay = useMemo(() => {
    return sessions.filter((s) => {
      const parsed = parseCustomDate(s.dateTime);
      if (!parsed) return false;

      return getDateString(parsed) === selectedDateStr;
    });
  }, [sessions, selectedDateStr]);

  return (
    <div className="grid md:grid-cols-2 gap-6">

      {/* 📅 Calendar */}
      <div className="bg-white p-4 rounded-xl shadow">
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}

          // ✅ Highlight dates with sessions
          tileClassName={({ date, view }) => {
            if (view !== "month") return null;

            const dateStr = getDateString(date);

            return sessionDatesSet.has(dateStr)
              ? "has-session"
              : null;
          }}
        />
      </div>

      {/* 📋 Sessions List */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4 text-black">
          Sessions on {selectedDateStr}
        </h2>

        <SessionList sessions={sessionsForDay} />
      </div>

    </div>
  );
};

export default CalendarView;
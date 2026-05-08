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

  // ✅ Selected date
  const selectedDateStr = getDateString(selectedDate);

  // ✅ Session dates
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

  // ✅ Sessions for selected day
  const sessionsForDay = useMemo(() => {
    return sessions.filter((s) => {
      const parsed = parseCustomDate(s.dateTime);
      if (!parsed) return false;

      return getDateString(parsed) === selectedDateStr;
    });
  }, [sessions, selectedDateStr]);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[420px_1fr] gap-6">

      {/* Calendar Card */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">

        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-blue-500 to-indigo-600">
          <h2 className="text-xl font-bold text-white">
            Study Calendar
          </h2>

          <p className="text-blue-100 text-sm mt-1">
            Track your attention sessions visually
          </p>
        </div>

        {/* Calendar */}
        <div className="p-5 calendar-wrapper">
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}

            tileClassName={({ date, view }) => {
              if (view !== "month") return null;

              const dateStr = getDateString(date);

              return sessionDatesSet.has(dateStr)
                ? "has-session"
                : null;
            }}
          />
        </div>
      </div>

      {/* Sessions Card */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-6 py-5 border-b border-gray-100">

          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Sessions
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              All study sessions for selected date
            </p>
          </div>

          <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-sm font-semibold w-fit">
            {selectedDateStr}
          </div>
        </div>

        {/* Session List */}
        <div className="p-5">
          {sessionsForDay.length > 0 ? (
            <SessionList sessions={sessionsForDay} />
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">

              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                📅
              </div>

              <h3 className="text-lg font-semibold text-gray-700">
                No Sessions Found
              </h3>

              <p className="text-sm text-gray-500 mt-1 max-w-sm">
                There are no attention tracking sessions available for this date.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
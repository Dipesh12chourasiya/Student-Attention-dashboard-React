import React, { useState, useMemo } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { getDateString } from "../../utils/dateUtils";

import SessionList from "../../components/session/SessionList";

const CalendarView = ({ sessions = [] }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const selectedDateStr = getDateString(selectedDate);

  //  Create a Set of dates with sessions (FAST lookup)
  const sessionDatesSet = useMemo(() => {
    return new Set(
      sessions.map((s) => getDateString(s.dateTime)).filter(Boolean)
    );
  }, [sessions]);

  //  Sessions for selected date
  const sessionsForDay = sessions.filter(
    (s) => getDateString(s.dateTime) === selectedDateStr
  );

  return (
    <div className="grid md:grid-cols-2 gap-6">

      {/*  Calendar */}
      <div className="bg-white p-4 rounded-xl shadow">
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

      {/*  Sessions List */}
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
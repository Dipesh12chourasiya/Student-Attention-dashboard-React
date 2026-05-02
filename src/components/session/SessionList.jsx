import React from "react";
import SessionCard from "./SessionCard";

const SessionList = ({ sessions = [] }) => {
  if (!sessions.length) {
    return (
      <div className="text-center text-gray-500 py-6">
        No sessions found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {sessions.map((session) => (
        <SessionCard
          key={session.sessionId}
          session={session}
        />
      ))}
    </div>
  );
};

export default SessionList;
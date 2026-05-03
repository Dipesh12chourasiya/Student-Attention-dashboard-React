import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";
import Card from "../../components/ui/Card";
import { getSessionById } from "../../services/sessionService";


const SessionCard = ({ session }) => {
  const navigate = useNavigate();

  if (!session) return null;

  const handleClick = () => {
    navigate(`/session/${session.sessionId}`, {
      state: {
        session,
        userId: session.userId, // 🔥 IMPORTANT FIX
      },
    });
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer bg-blue-50 border rounded-xl p-4 hover:shadow-md transition"
    >
      <h3 className="font-semibold">{session.title}</h3>
      <p>{session.attentionPercent}% attention</p>
      <p className="text-sm text-gray-500">{session.dateTime}</p>
    </div>
  );
};

export default SessionCard;
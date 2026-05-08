import React from "react";
import { useNavigate } from "react-router-dom";

import {
  CalendarDays,
  Brain,
  Clock3,
  ArrowUpRight,
} from "lucide-react";

const SessionCard = ({ session }) => {
  const navigate = useNavigate();

  if (!session) return null;

  const handleClick = () => {
    navigate(`/session/${session.sessionId}`, {
      state: {
        session,
        userId: session.userId,
      },
    });
  };

  const attention = session.attentionPercent || 0;

  // Dynamic color
  const getAttentionColor = () => {
    if (attention >= 80)
      return "text-green-600 bg-green-50 border-green-100";

    if (attention >= 60)
      return "text-yellow-600 bg-yellow-50 border-yellow-100";

    return "text-red-600 bg-red-50 border-red-100";
  };

  return (
    <div
      onClick={handleClick}
      className="
        group
        relative
        overflow-hidden
        cursor-pointer
        bg-white
        border border-gray-200
        rounded-3xl
        p-5
        shadow-sm
        hover:shadow-xl
        hover:-translate-y-1
        transition-all
        duration-300
      "
    >

      {/* Top Gradient */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600" />

      {/* Header */}
      <div className="flex items-start justify-between gap-4">

        <div className="flex-1 min-w-0">

          <h3 className="
            text-lg
            sm:text-xl
            font-bold
            text-gray-800
            truncate
          ">
            {session.title || "Untitled Session"}
          </h3>

          <div className="flex items-center gap-2 mt-2 text-gray-500 text-sm">

            <CalendarDays size={16} />

            <span className="truncate">
              {session.dateTime}
            </span>
          </div>
        </div>

        {/* Arrow */}
        <div className="
          w-10 h-10
          rounded-2xl
          bg-gray-100
          flex items-center justify-center
          group-hover:bg-blue-100
          transition
        ">
          <ArrowUpRight
            size={18}
            className="text-gray-600 group-hover:text-blue-600"
          />
        </div>
      </div>

      {/* Attention */}
      <div className="mt-5">

        <div className="flex items-center justify-between mb-2">

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Brain size={16} />
            Attention Score
          </div>

          <span
            className={`
              px-3 py-1
              rounded-full
              text-sm
              font-semibold
              border
              ${getAttentionColor()}
            `}
          >
            {attention}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="
              h-full
              rounded-full
              bg-gradient-to-r
              from-blue-500
              to-indigo-600
              transition-all
              duration-500
            "
            style={{
              width: `${attention}%`,
            }}
          />
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-5 flex items-center justify-between">

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock3 size={15} />
          <span>
            {session.duration || "N/A"}
          </span>
        </div>

        <button
          className="
            text-sm
            font-semibold
            text-blue-600
            group-hover:translate-x-1
            transition-transform
          "
        >
          View Details 
        </button>
      </div>
    </div>
  );
};

export default SessionCard;
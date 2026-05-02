import React from "react";

const SessionCard = ({ session }) => {
  return (
    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 shadow-sm hover:shadow-md transition duration-200">

      {/* Title + Attention */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-black">
          {session.title || "Untitled Session"}
        </h3>

        <span className="text-sm font-bold text-blue-600">
          {session.attentionPercent || 0}%
        </span>
      </div>

      {/* Meta Info */}
      <div className="text-sm text-gray-600 space-y-1">

        <p>
           Duration:{" "}
          <span className="font-medium text-black">
            {session.duration || "--"}
          </span>
        </p>

        <p>
          Faces:{" "}
          <span className="font-medium text-black">
            {session.totalFaces || 0}
          </span>
        </p>

        <p>
           Frames:{" "}
          <span className="font-medium text-black">
            {session.totalFrames || 0}
          </span>
        </p>

      </div>

      {/* Notes */}
      {session.notes && (
        <div className="mt-3 text-sm text-gray-700 bg-white p-2 rounded-md border">
           {session.notes}
        </div>
      )}

    </div>
  );
};

export default SessionCard;
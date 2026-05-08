import React from "react";
import UserRow from "./UserRow";

import { useNavigate } from "react-router-dom";
import {
  deleteUser,
  disableUser,
} from "../../services/adminService";

const UserTable = ({ users = [] }) => {
  const navigate = useNavigate();

  if (!users.length) {
    return (
      <div className="text-center text-gray-500 py-10">No users found</div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">
      {/*  DESKTOP TABLE */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600 sticky top-0">
            <tr>
              <th className="p-4 text-left">User</th>
              <th className="p-4 text-left">Sessions</th>
              <th className="p-4 text-left">Attention</th>
              <th className="p-4 text-left">Last Active</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <UserRow key={user.uid} user={user} />
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE VIEW */}
      <div className="md:hidden p-4 space-y-4">
        {users.map((user) => {
          const goToUser = () => {
            navigate(`/admin/user/${user.uid}`, {
              state: { user },
            });
          };

          const handleDelete = async () => {
            if (!window.confirm("Delete user?")) return;

            await deleteUser(user.uid);

            window.location.reload();
          };

          const handleDisable = async () => {
            await disableUser(user.uid);

            window.location.reload();
          };

          return (
            <div
              key={user.uid}
              onClick={goToUser}
              className="
          bg-white
          border border-gray-200
          rounded-2xl
          p-4
          shadow-sm
          active:scale-[0.98]
          transition
        "
            >
              {/* Top */}
              <div className="flex items-center gap-3">
                <div
                  className="
            w-12 h-12
            rounded-full
            bg-gradient-to-r
            from-blue-500
            to-indigo-600
            text-white
            flex items-center justify-center
            font-semibold
          "
                >
                  {user.username?.charAt(0)?.toUpperCase()}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 truncate">
                    {user.username}
                  </p>

                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>

                <span
                  className={`
              px-2 py-1 rounded-full text-xs font-medium
              ${
                user.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }
            `}
                >
                  {user.status}
                </span>
              </div>

              {/* Stats */}
              <div
                className="
          grid grid-cols-2 gap-3
          mt-4 text-sm
        "
              >
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-gray-500 text-xs">Sessions</p>

                  <p className="font-bold text-gray-800 mt-1">
                    {user.totalSessions}
                  </p>
                </div>

                <div className="bg-blue-50 rounded-xl p-3">
                  <p className="text-blue-500 text-xs">Attention</p>

                  <p className="font-bold text-blue-700 mt-1">
                    {user.avgAttention}%
                  </p>
                </div>
              </div>

              {/* Last Active */}
              <div className="mt-4 text-xs text-gray-500">
                Last Active: {user.lastActive || "—"}
              </div>

              {/* Buttons */}
              <div
                className="flex gap-2 mt-4"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={handleDisable}
                  className="
              flex-1 py-2 rounded-xl
              bg-yellow-100
              text-yellow-700
              font-medium text-sm
              active:scale-95
              transition
            "
                >
                  Disable
                </button>

                <button
                  onClick={handleDelete}
                  className="
              flex-1 py-2 rounded-xl
              bg-red-100
              text-red-600
              font-medium text-sm
              active:scale-95
              transition
            "
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserTable;

import React from "react";
import UserRow from "./UserRow";

const UserTable = ({ users = [] }) => {

  if (!users.length) {
    return (
      <div className="text-center text-gray-500 py-10">
        No users found
      </div>
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

      {/*  MOBILE VIEW (CARD STYLE) */}
      <div className="md:hidden p-4 space-y-4">
        {users.map((user) => (
          <div
            key={user.uid}
            className="border rounded-xl p-4 shadow-sm space-y-3"
          >

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
                {user.username?.charAt(0)?.toUpperCase()}
              </div>

              <div>
                <p className="font-semibold">{user.username}</p>
                <p className="text-xs text-gray-500">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 text-sm gap-2">
              <p>Sessions: {user.totalSessions}</p>
              <p>Attention: {user.avgAttention}%</p>
              <p>Last Active: {user.lastActive || "—"}</p>
              <p>
                Status:{" "}
                <span
                  className={
                    user.status === "Active"
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {user.status}
                </span>
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => disableUser(user.uid)}
                className="flex-1 bg-yellow-100 text-yellow-700 py-1 rounded"
              >
                Disable
              </button>

              <button
                onClick={() => deleteUser(user.uid)}
                className="flex-1 bg-red-100 text-red-600 py-1 rounded"
              >
                Delete
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default UserTable;
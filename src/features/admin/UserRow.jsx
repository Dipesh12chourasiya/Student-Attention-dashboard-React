import React from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteUser,
  disableUser,
} from "../../services/adminService";


const UserRow = ({ user }) => {

  const navigate = useNavigate();

  const goToUser = () => {
    navigate(`/admin/user/${user.uid}`, {
      state: { user }, // optional (fast loading)
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
    <tr className="border-t hover:bg-gray-50 transition">

      {/*  USER INFO */}

      <td className="p-4 cursor-pointer" onClick={goToUser}>
        <div className="flex items-center gap-3">

          <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold">
            {user.username?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <div>
            <p className="font-semibold text-gray-900">
              {user.username}
            </p>
            <p className="text-xs text-gray-500">
              {user.email}
            </p>
          </div>

        </div>
      </td>


      {/*  STATS */}
      <td className="p-4 text-gray-700 text-sm">
        {user.totalSessions}
      </td>

      <td className="p-4 text-sm">
        <span className="font-semibold text-blue-600">
          {user.avgAttention}%
        </span>
      </td>

      {/*  LAST ACTIVE */}
      <td className="p-4 text-xs text-gray-500">
        {user.lastActive || "—"}
      </td>

      {/*  STATUS */}
      <td className="p-4">
        <span
          className={`
            px-3 py-1 rounded-full text-xs font-medium
            ${
              user.status === "Active"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }
          `}
        >
          {user.status}
        </span>
      </td>

      {/*  ACTIONS */}
      <td className="p-4">
        <div className="flex gap-2 flex-wrap">

          <button
            onClick={handleDisable}
            className="
              px-3 py-1 text-xs font-medium
              bg-yellow-100 text-yellow-700
              rounded-lg hover:bg-yellow-200 transition
            "
          >
            Disable
          </button>

          <button
            onClick={handleDelete}
            className="
              px-3 py-1 text-xs font-medium
              bg-red-100 text-red-600
              rounded-lg hover:bg-red-200 transition
            "
          >
            Delete
          </button>

        </div>
      </td>

    </tr>
  );
};

export default UserRow;
import React from "react";
import { NavLink } from "react-router-dom";
import { X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { userData } = useAuth();

  const linkClasses =
    "block px-4 py-3 rounded-lg transition font-medium";

  const activeClass =
    "bg-blue-500 text-white";

  const inactiveClass =
    "text-gray-700 hover:bg-blue-100";

  const isAdmin = userData?.role === "admin";

  return (
    <>
      {/* Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed md:static top-0 left-0 z-50
          h-screen w-64 bg-white border-r border-gray-200 p-4
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-black">
            Attention Tracker
          </h2>

          {/* Close Button */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-1 rounded hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">

          <NavLink
            to="/dashboard"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `${linkClasses} ${
                isActive ? activeClass : inactiveClass
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/analytics"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `${linkClasses} ${
                isActive ? activeClass : inactiveClass
              }`
            }
          >
            Analytics
          </NavLink>

          {isAdmin && (
            <NavLink
              to="/admin"
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `${linkClasses} ${
                  isActive ? activeClass : inactiveClass
                }`
              }
            >
              Admin Panel
            </NavLink>
          )}

          {/* <NavLink
            to="/profile"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `${linkClasses} ${
                isActive ? activeClass : inactiveClass
              }`
            }
          >
            Profile
          </NavLink> */}

        </nav>
      </div>
    </>
  );
};

export default Sidebar;
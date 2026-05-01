import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkClasses =
    "block px-4 py-2 rounded-lg transition";

  const activeClass =
    "bg-blue-500 text-white";

  const inactiveClass =
    "text-gray-700 hover:bg-blue-100";

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen p-4 hidden md:block">
      
      <h2 className="text-lg font-bold text-black mb-6">
        Attention Tracker
      </h2>

      <nav className="flex flex-col gap-2">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${linkClasses} ${isActive ? activeClass : inactiveClass}`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            `${linkClasses} ${isActive ? activeClass : inactiveClass}`
          }
        >
          Analytics
        </NavLink>

        <NavLink
          to="/admin"
          className={({ isActive }) =>
            `${linkClasses} ${isActive ? activeClass : inactiveClass}`
          }
        >
          Admin Panel
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `${linkClasses} ${isActive ? activeClass : inactiveClass}`
          }
        >
          Profile
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
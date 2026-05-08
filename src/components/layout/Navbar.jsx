import React from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = ({
  title = "Dashboard",
  userName = "User",
  sidebarOpen,
  setSidebarOpen,
}) => {

  const navigate = useNavigate();

  return (
    <nav className="w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30">

      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Left */}
        <div className="flex items-center gap-3">

          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          >
            {sidebarOpen ? (
              <X className="w-5 h-5 text-gray-700" />
            ) : (
              <Menu className="w-5 h-5 text-gray-700" />
            )}
          </button>

          {/* Title */}
          <h1 className="text-lg sm:text-2xl font-bold text-gray-800 tracking-tight">
            {title}
          </h1>
        </div>

        {/* Right */}
        <div
          onClick={() => navigate("/profile")}
          className="flex items-center gap-3 bg-gray-100 px-2 sm:px-3 py-2 rounded-xl hover:bg-gray-200 transition cursor-pointer"
        >

          {/* Avatar */}
          <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold shadow">
            {userName?.charAt(0).toUpperCase()}
          </div>

          {/* Username */}
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-sm font-semibold text-gray-800">
              {userName}
            </span>

            <span className="text-xs text-gray-500">
              Admin
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
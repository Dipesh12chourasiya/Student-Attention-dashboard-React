import React from "react";

const Navbar = ({ title = "Dashboard", userName = "User" }) => {
  return (
    <div className="w-full bg-blue-500 px-6 py-4 flex justify-between items-center shadow-md">
      
      {/* Left - Title */}
      <h1 className="text-white text-xl font-semibold">
        {title}
      </h1>

      {/* Right - User */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-blue-500 font-bold">
          {userName?.charAt(0).toUpperCase()}
        </div>
        <span className="text-white font-medium hidden sm:block">
          {userName}
        </span>
      </div>
    </div>
  );
};

export default Navbar;
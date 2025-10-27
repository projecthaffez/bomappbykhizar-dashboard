import React from "react";
import { NavLink } from "react-router-dom";

const Link = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `block px-4 py-3 rounded-lg mb-2 ${isActive ? "bg-yellow-500 text-black" : "text-gray-300 hover:bg-gray-800"}`
    }
  >
    {children}
  </NavLink>
);

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#0a0a0a] p-6 border-r border-gray-800 min-h-screen">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-yellow-400">BomAppByKhizar</h2>
        <p className="text-xs text-gray-400 mt-1">Auto Promo Dashboard</p>
      </div>
      <nav className="mt-6">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/stats">Stats</Link>
        <Link to="/pages">Pages</Link>
        <Link to="/settings">Settings</Link>
        <Link to="/login">Login</Link>
      </nav>
    </aside>
  );
}

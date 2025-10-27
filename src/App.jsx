import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Stats from "./pages/Stats";
import Pages from "./pages/Pages";
import Settings from "./pages/Settings";
import Login from "./pages/Login";

export default function App() {
  return (
    <div className="min-h-screen bg-[#0b0b0b] text-[#f5f5f5] flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-[#FFD700]/30 scrollbar-track-transparent">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/pages" element={<Pages />} />
            <Route path="/settings" element={<Settings />} />

            {/* Default Redirect */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

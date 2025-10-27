import React from "react";

export default function Header(){
  return (
    <header className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-semibold text-yellow-400">🎯 Control Panel</h1>
        <p className="text-sm text-gray-400">Manage promos, view stats & control system</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-sm text-gray-400">v7.0</div>
      </div>
    </header>
  );
}

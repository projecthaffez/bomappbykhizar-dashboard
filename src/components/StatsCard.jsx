import React from "react";

export default function StatsCard({ title, value, tone = "neutral" }) {
  const toneClasses = tone === "danger" ? "text-red-400" : tone === "good" ? "text-green-400" : "text-yellow-300";
  return (
    <div className="bg-gray-800 p-4 rounded-xl w-full">
      <div className="text-sm text-gray-400">{title}</div>
      <div className={`text-2xl font-semibold ${toneClasses}`}>{value}</div>
    </div>
  );
}

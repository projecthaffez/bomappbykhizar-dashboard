import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const API = import.meta.env.VITE_API_BASE || "https://bomappbykhizar-webhook.onrender.com";

export default function Stats(){
  const [stats, setStats] = useState({});
  const [history, setHistory] = useState([]);

  useEffect(()=> {
    fetch(`${API}/promo-stats`).then(r=>r.json()).then(j=>{ setStats(j); setHistory([ {name: "last", sent: j.sent || 0, failed: j.failed || 0 } ])}).catch(()=>{});
  },[]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-yellow-300">Promo Stats</h2>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-800 p-4 rounded"><div className="text-sm text-gray-400">Total Sent</div><div className="text-2xl font-semibold">{stats.sent ?? 0}</div></div>
        <div className="bg-gray-800 p-4 rounded"><div className="text-sm text-gray-400">Failed</div><div className="text-2xl font-semibold">{stats.failed ?? 0}</div></div>
        <div className="bg-gray-800 p-4 rounded"><div className="text-sm text-gray-400">Skipped</div><div className="text-2xl font-semibold">{stats.skipped ?? 0}</div></div>
      </div>

      <div className="bg-gray-800 p-4 rounded h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={history}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="sent" stroke="#FFD700" strokeWidth={2}/>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import StatsCard from "../components/StatsCard";

const API = import.meta.env.VITE_API_BASE || "https://bomappbykhizar-webhook.onrender.com";
const SECRET = import.meta.env.VITE_ADMIN_SECRET || "khizarBulkKey123";

export default function Dashboard(){
  const [status, setStatus] = useState({});
  const [stats, setStats] = useState({});
  const [sync, setSync] = useState({});
  const [manualMsg, setManualMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchStatus(){
    try {
      const r = await fetch(`${API}/promo/status`);
      setStatus(await r.json());
    } catch(e) { console.log(e); }
  }
  async function fetchStats(){
    try {
      const r = await fetch(`${API}/promo-stats`);
      setStats(await r.json());
    } catch(e){ console.log(e); }
  }
  async function fetchSync(){
    try {
      const r = await fetch(`${API}/sync-stats`);
      setSync(await r.json());
    } catch(e){ console.log(e); }
  }

  useEffect(()=>{
    fetchStatus(); fetchStats(); fetchSync();
    const iv = setInterval(()=>{ fetchStatus(); fetchStats(); fetchSync(); }, 10000);
    return ()=>clearInterval(iv);
  },[]);

  async function handlePause(){ setLoading(true);
    await fetch(`${API}/promo/pause`, { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ secret: SECRET }) });
    await fetchStatus(); setLoading(false);
  }
  async function handleResume(){ setLoading(true);
    await fetch(`${API}/promo/resume`, { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ secret: SECRET }) });
    await fetchStatus(); setLoading(false);
  }

  async function sendManual(){
    if(!manualMsg.trim()){ alert("Type a message"); return; }
    setLoading(true);
    const res = await fetch(`${API}/manual-promo`, { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ secret: SECRET, message: manualMsg, target: "recent" }) });
    const j = await res.json();
    alert(`Sent: ${j.sent || 0}, Failed: ${j.failed || 0}, Skipped: ${j.skipped || 0}`);
    setManualMsg(""); fetchStats(); setLoading(false);
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <StatsCard title="Promo Sent (last run)" value={stats.sent ?? 0} tone="good" />
        <StatsCard title="Promo Failed (last run)" value={stats.failed ?? 0} tone="danger" />
        <StatsCard title="Promo Skipped" value={stats.skipped ?? 0} />
      </div>

      <div className="bg-gray-800 p-6 rounded-2xl mb-6">
        <h3 className="text-lg font-semibold text-yellow-300 mb-2">Promo System Status</h3>
        <div className="flex items-center gap-4">
          <div className={status.paused ? "text-red-400" : "text-green-400"}>
            {status.paused ? "⏸️ Paused" : "▶️ Running"}
          </div>
          <div className="text-sm text-gray-400">{status.isOnlinePromoRunning ? "Auto Promo in progress..." : "Idle"}</div>
        </div>

        <div className="mt-4 flex gap-3">
          <button onClick={handlePause} disabled={loading} className="px-4 py-2 rounded bg-red-600">⏸️ Pause</button>
          <button onClick={handleResume} disabled={loading} className="px-4 py-2 rounded bg-green-600">▶️ Resume</button>
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-2xl">
        <h3 className="text-lg font-semibold text-blue-300 mb-2">Manual Promo Sender</h3>
        <textarea rows={4} className="w-full p-3 rounded mb-3 text-black" value={manualMsg} onChange={e=>setManualMsg(e.target.value)} placeholder="Type message..."></textarea>
        <div className="flex gap-3">
          <button onClick={sendManual} disabled={loading} className="bg-blue-600 px-4 py-2 rounded">🚀 Send Manual Promo</button>
          <button onClick={()=>{ setManualMsg(""); }} className="bg-gray-700 px-4 py-2 rounded">Clear</button>
        </div>
      </div>

      <p className="text-gray-500 mt-6">BomAppByKhizar v7.0 — AI Auto Promo + Controls</p>
    </div>
  );
}

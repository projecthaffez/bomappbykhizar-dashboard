import React, { useEffect, useState } from "react";
import StatsCard from "../components/StatsCard";

const API = import.meta.env.VITE_API_BASE || "https://bomappbykhizar-webhook.onrender.com";
const SECRET = import.meta.env.VITE_ADMIN_SECRET || "khizarBulkKey123";

export default function Dashboard() {
  const [status, setStatus] = useState({});
  const [stats, setStats] = useState({});
  const [sync, setSync] = useState({});
  const [manualMsg, setManualMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiPreview, setAiPreview] = useState(""); // 🤖 AI Preview message
  const [aiLoading, setAiLoading] = useState(false);

  // ===== FETCH HANDLERS =====
  async function fetchStatus() {
    try {
      const res = await fetch(`${API}/promo/status`);
      setStatus(await res.json());
    } catch (e) {
      console.error("Fetch status error:", e);
    }
  }

  async function fetchStats() {
    try {
      const res = await fetch(`${API}/promo-stats`);
      setStats(await res.json());
    } catch (e) {
      console.error("Fetch stats error:", e);
    }
  }

  async function fetchSync() {
    try {
      const res = await fetch(`${API}/sync-stats`);
      setSync(await res.json());
    } catch (e) {
      console.error("Fetch sync error:", e);
    }
  }

  useEffect(() => {
    fetchStatus();
    fetchStats();
    fetchSync();
    const iv = setInterval(() => {
      fetchStatus();
      fetchStats();
      fetchSync();
    }, 10000);
    return () => clearInterval(iv);
  }, []);

  // ===== PAUSE / RESUME =====
  async function handlePause() {
    setLoading(true);
    await fetch(`${API}/promo/pause`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: SECRET }),
    });
    await fetchStatus();
    setLoading(false);
  }

  async function handleResume() {
    setLoading(true);
    await fetch(`${API}/promo/resume`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: SECRET }),
    });
    await fetchStatus();
    setLoading(false);
  }

  // ===== MANUAL PROMO =====
  async function sendManual() {
    if (!manualMsg.trim()) {
      alert("Type a message first");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API}/manual-promo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret: SECRET, message: manualMsg, target: "recent" }),
      });
      const j = await res.json();
      alert(`Sent: ${j.sent || 0}, Failed: ${j.failed || 0}, Skipped: ${j.skipped || 0}`);
      setManualMsg("");
      fetchStats();
    } catch (err) {
      alert("Manual promo failed");
    }
    setLoading(false);
  }

  // ===== AI MESSAGE PREVIEW =====
  async function generateAiPreview() {
    setAiLoading(true);
    try {
      const res = await fetch(`${API}/ai-preview`);
      const data = await res.json();
      setAiPreview(data.message || "⚠️ No AI message received");
    } catch (err) {
      setAiPreview("⚠️ Error fetching AI preview");
    }
    setAiLoading(false);
  }

  // ===== UI =====
  return (
    <div>
      {/* ===== STATS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatsCard title="Promo Sent (Last Run)" value={stats.sent ?? 0} tone="good" />
        <StatsCard title="Promo Failed (Last Run)" value={stats.failed ?? 0} tone="danger" />
        <StatsCard title="Promo Skipped" value={stats.skipped ?? 0} />
      </div>

      {/* ===== STATUS ===== */}
      <div className="bg-gray-800 p-6 rounded-2xl mb-6 shadow-md">
        <h3 className="text-lg font-semibold text-yellow-300 mb-2">Promo System Status</h3>
        <div className="flex items-center gap-4">
          <div className={status.paused ? "text-red-400" : "text-green-400"}>
            {status.paused ? "⏸️ Paused" : "▶️ Running"}
          </div>
          <div className="text-sm text-gray-400">
            {status.isOnlinePromoRunning ? "Auto Promo in progress..." : "Idle"}
          </div>
        </div>

        <div className="mt-4 flex gap-3">
          <button
            onClick={handlePause}
            disabled={loading}
            className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 disabled:opacity-50"
          >
            ⏸️ Pause
          </button>
          <button
            onClick={handleResume}
            disabled={loading}
            className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 disabled:opacity-50"
          >
            ▶️ Resume
          </button>
        </div>
      </div>

      {/* ===== AUTO PROMO STATUS ===== */}
      <div className="bg-gray-800 p-6 rounded-2xl mb-6 shadow-md">
        <h3 className="text-lg font-semibold text-yellow-400 mb-3">🛰️ Auto Promo Stats (Live)</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-200">
          <div>✅ Sent: {stats.sent ?? 0}</div>
          <div>⚠️ Skipped: {stats.skipped ?? 0}</div>
          <div>❌ Failed: {stats.failed ?? 0}</div>
          <div className="text-sm text-gray-400">Last Run: {stats.lastRun || "—"}</div>
        </div>
      </div>

      {/* ===== MANUAL PROMO ===== */}
      <div className="bg-gray-800 p-6 rounded-2xl mb-6 shadow-md">
        <h3 className="text-lg font-semibold text-blue-300 mb-2">Manual Promo Sender</h3>
        <textarea
          rows={4}
          className="w-full p-3 rounded mb-3 text-black"
          value={manualMsg}
          onChange={(e) => setManualMsg(e.target.value)}
          placeholder="Type message..."
        ></textarea>
        <div className="flex gap-3">
          <button
            onClick={sendManual}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white disabled:opacity-50"
          >
            🚀 Send Manual Promo
          </button>
          <button
            onClick={() => setManualMsg("")}
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-white"
          >
            Clear
          </button>
        </div>
      </div>

      {/* ===== AI PREVIEW ===== */}
      <div className="bg-gray-800 p-6 rounded-2xl shadow-md">
        <h3 className="text-lg font-semibold text-purple-300 mb-2">🤖 AI Message Preview</h3>
        <button
          onClick={generateAiPreview}
          disabled={aiLoading}
          className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-white disabled:opacity-50"
        >
          {aiLoading ? "Generating..." : "Generate Sample Message"}
        </button>
        {aiPreview && (
          <p className="mt-3 bg-gray-900 text-gray-200 p-3 rounded-lg border border-gray-700 whitespace-pre-line">
            {aiPreview}
          </p>
        )}
      </div>

      {/* ===== FOOTER ===== */}
      <p className="text-gray-500 mt-6">
        BomAppByKhizar v7.0 — AI Auto Promo + Live Stats + AI Preview
      </p>
    </div>
  );
}

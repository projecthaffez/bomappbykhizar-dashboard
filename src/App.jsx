import React, { useState, useEffect } from "react";

export default function App() {
  const [status, setStatus] = useState({});
  const [loading, setLoading] = useState(false);
  const [manualMsg, setManualMsg] = useState("");
  const [manualResult, setManualResult] = useState(null);

  const SECRET = "khizarBulkKey123"; // same as backend secret
  const API_BASE = "https://bomappbykhizar-webhook.onrender.com"; // your backend Render URL

  // Fetch promo status
  async function fetchStatus() {
    const res = await fetch(`${API_BASE}/promo/status`);
    const data = await res.json();
    setStatus(data);
  }

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 10000);
    return () => clearInterval(interval);
  }, []);

  // Pause Promo
  async function handlePause() {
    setLoading(true);
    await fetch(`${API_BASE}/promo/pause`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: SECRET }),
    });
    await fetchStatus();
    setLoading(false);
  }

  // Resume Promo
  async function handleResume() {
    setLoading(true);
    await fetch(`${API_BASE}/promo/resume`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: SECRET }),
    });
    await fetchStatus();
    setLoading(false);
  }

  // Manual Promo
  async function sendManualPromo() {
    if (!manualMsg.trim()) {
      alert("⚠️ Please enter a promo message first!");
      return;
    }
    setLoading(true);
    const res = await fetch(`${API_BASE}/manual-promo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: SECRET, message: manualMsg }),
    });
    const data = await res.json();
    setManualResult(data);
    setManualMsg("");
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold mb-6 text-yellow-400">
        🎯 BomAppByKhizar — Auto Promo Dashboard
      </h1>

      {/* STATUS CARD */}
      <div className="bg-gray-800 rounded-2xl p-6 shadow-lg w-full max-w-lg text-center">
        <h2 className="text-xl font-semibold mb-2">Promo System Status</h2>
        <p className={`text-lg ${status.paused ? "text-red-400" : "text-green-400"}`}>
          {status.paused ? "⏸️ Paused" : "▶️ Running"}
        </p>
        <p className="text-sm text-gray-400 mt-1">
          {status.isOnlinePromoRunning ? "Auto Promo in progress..." : "Idle"}
        </p>

        <div className="mt-4 flex justify-center gap-4">
          <button
            onClick={handlePause}
            disabled={loading}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
          >
            ⏸️ Pause
          </button>
          <button
            onClick={handleResume}
            disabled={loading}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
          >
            ▶️ Resume
          </button>
        </div>
      </div>

      {/* MANUAL PROMO SENDER */}
      <div className="bg-gray-800 rounded-2xl p-6 shadow-lg w-full max-w-lg mt-8">
        <h2 className="text-xl font-semibold mb-3 text-blue-400">
          💬 Manual Promo Sender
        </h2>
        <textarea
          value={manualMsg}
          onChange={(e) => setManualMsg(e.target.value)}
          placeholder="Type your promo message here..."
          className="w-full p-3 rounded-lg text-black outline-none"
          rows={3}
        ></textarea>

        <button
          onClick={sendManualPromo}
          disabled={loading}
          className="mt-3 bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded-lg font-medium disabled:opacity-50"
        >
          🚀 Send Manual Promo
        </button>

        {manualResult && (
          <div className="mt-4 text-sm bg-gray-700 p-3 rounded-lg">
            <p>✅ Sent: {manualResult.sent}</p>
            <p>⚠️ Skipped: {manualResult.skipped}</p>
            <p>❌ Failed: {manualResult.failed}</p>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <p className="mt-8 text-gray-500 text-sm">
        BomAppByKhizar v6.0 — AI Auto Promo System 🌙
      </p>
    </div>
  );
}

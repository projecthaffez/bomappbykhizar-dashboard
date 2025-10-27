import React, { useState } from "react";

export default function Settings(){
  const [apiKey, setApiKey] = useState("");
  return (
    <div>
      <h2 className="text-xl font-semibold text-yellow-300 mb-4">Settings</h2>
      <div className="bg-gray-800 p-4 rounded">
        <label className="text-sm text-gray-400">OpenAI API Key</label>
        <input value={apiKey} onChange={e=>setApiKey(e.target.value)} className="w-full p-2 rounded mt-2 text-black" placeholder="sk-..." />
        <div className="mt-3">
          <button className="bg-yellow-400 text-black px-4 py-2 rounded">Save</button>
        </div>
      </div>
    </div>
  );
}

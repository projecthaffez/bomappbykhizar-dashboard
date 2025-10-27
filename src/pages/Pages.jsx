import React from "react";

export default function Pages(){
  return (
    <div>
      <h2 className="text-xl font-semibold text-yellow-300 mb-4">Facebook Pages</h2>
      <div className="bg-gray-800 p-4 rounded">
        <p className="text-sm text-gray-400">Add / remove Facebook Pages (placeholder UI)</p>
        <div className="mt-3">
          <button className="bg-blue-600 px-4 py-2 rounded">Add Page</button>
        </div>
      </div>
    </div>
  );
}

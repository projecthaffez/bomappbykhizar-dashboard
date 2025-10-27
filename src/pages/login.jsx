import React from "react";

export default function Login(){
  return (
    <div className="max-w-md mx-auto mt-12">
      <div className="bg-gray-800 p-6 rounded">
        <h2 className="text-xl font-semibold text-yellow-300 mb-3">Login with Facebook</h2>
        <p className="text-sm text-gray-400">(placeholder) Click to sign in</p>
        <div className="mt-4">
          <button className="bg-blue-600 px-4 py-2 rounded">Login with Facebook</button>
        </div>
      </div>
    </div>
  );
}

import React from 'react'
export default function Header(){
  return (
    <header className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold text-yellow-400">Dashboard</h1>
      <div className="flex gap-3 items-center">
        <button id='syncBtn' className="bg-yellow-500 text-black px-4 py-2 rounded-2xl font-semibold">Sync Users</button>
        <button id='promoBtn' className="bg-yellow-500 text-black px-4 py-2 rounded-2xl font-semibold">Run Promo Now</button>
      </div>
    </header>
  )
}

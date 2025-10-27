import React from 'react'
export default function Sidebar(){
  return (
    <aside className="w-72 bg-[#070707] border-r border-yellow-600/10 p-6 hidden md:block">
      <div className="mb-8 text-2xl font-bold text-yellow-400">BomAppByKhizar</div>
      <nav className="space-y-2 text-sm">
        <a className="block p-3 rounded-lg hover:bg-yellow-600/10">Dashboard</a>
        <a className="block p-3 rounded-lg hover:bg-yellow-600/10">Stats</a>
        <a className="block p-3 rounded-lg hover:bg-yellow-600/10">Pages</a>
        <a className="block p-3 rounded-lg hover:bg-yellow-600/10">Settings</a>
      </nav>
      <div className="mt-8 text-xs text-yellow-300">Logged in as: Admin</div>
    </aside>
  )
}

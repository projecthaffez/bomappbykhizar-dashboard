import React, { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const API = import.meta.env.VITE_API_BASE || 'https://bomappbykhizar-webhook.onrender.com'

export default function Dashboard(){
  const [stats, setStats] = useState({sent:0, failed:0, skipped:0, totalActive:0, totalUsers:0})
  const [lastRuns, setLastRuns] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(()=>{ fetchStats() },[])

  async function fetchStats(){
    try{
      const res = await fetch(API + '/promo-stats'); if(!res.ok) throw new Error('No stats')
      const j = await res.json(); setStats(j)
    }catch(e){ console.warn('promo-stats failed', e) }
    try{
      const res2 = await fetch(API + '/sync-stats'); if(res2.ok){ const s=await res2.json(); setStats(prev=>({...prev, totalUsers:s.total})) }
    }catch(e){}
  }

  async function runPromo(){
    setLoading(true)
    try{
      const r = await fetch(API + '/auto-online-promo', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({secret: 'khizarBulkKey123'})})
      if(!r.ok) throw new Error('Trigger failed')
      await fetchStats()
      alert('Promo triggered successfully')
    }catch(e){ alert('Promo trigger failed: '+e.message) }
    setLoading(false)
  }

  async function syncUsers(){
    setLoading(true)
    try{
      const r = await fetch(API + '/sync-users', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({secret: 'khizarBulkKey123'})})
      const data = await r.json()
      if(!r.ok) throw new Error(data.error || 'Sync failed')
      await fetchStats()
      alert('Sync complete — added: '+(data.added||0))
    }catch(e){ alert('Sync failed: '+e.message) }
    setLoading(false)
  }

  const chartData = [
    {name: 'Run 1', sent: 40, failed: 4},
    {name: 'Run 2', sent: 50, failed: 6},
    {name: 'Run 3', sent: 48, failed: 3},
    {name: 'Run 4', sent: stats.sent, failed: stats.failed},
  ]

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="card">
          <div className="text-sm text-yellow-300">Sent</div>
          <div className="text-3xl font-bold">{stats.sent}</div>
          <div className="text-xs text-gray-400">Messages successfully delivered</div>
        </div>
        <div className="card">
          <div className="text-sm text-yellow-300">Failed</div>
          <div className="text-3xl font-bold">{stats.failed}</div>
          <div className="text-xs text-gray-400">Failed deliveries</div>
        </div>
        <div className="card">
          <div className="text-sm text-yellow-300">Skipped</div>
          <div className="text-3xl font-bold">{stats.skipped}</div>
          <div className="text-xs text-gray-400">Skipped due cooldown</div>
        </div>
        <div className="card">
          <div className="text-sm text-yellow-300">Users</div>
          <div className="text-3xl font-bold">{stats.totalUsers}</div>
          <div className="text-xs text-gray-400">Total users in database</div>
        </div>
      </div>

      <div className="card mb-6">
        <h3 className="text-yellow-300 font-semibold mb-3">Promo Performance (sample)</h3>
        <div style={{height:240}}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="name" stroke="#8884d8" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sent" stroke="#FFD700" strokeWidth={2} />
              <Line type="monotone" dataKey="failed" stroke="#FF5C00" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={syncUsers} className="bg-yellow-500 text-black px-4 py-2 rounded-2xl font-semibold">Sync Users</button>
        <button onClick={runPromo} className="bg-yellow-500 text-black px-4 py-2 rounded-2xl font-semibold">Run Promo Now</button>
      </div>
    </div>
  )
}

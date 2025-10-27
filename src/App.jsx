import React from 'react'
import Dashboard from './pages/Dashboard'
import Sidebar from './components/Sidebar'
import Header from './components/Header'

export default function App(){
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <Header />
        <Dashboard />
      </div>
    </div>
  )
}

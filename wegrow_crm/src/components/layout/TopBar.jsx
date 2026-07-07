import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Bell, Search, Menu } from 'lucide-react'
import Avatar from '../ui/Avatar'
import { useAuth } from '../../context/AuthProvider'

const PAGE_TITLES = {
  '/':           'Dashboard',
  '/leads':      'Leads',
  '/leads/new':  'Add New Lead',
  '/clients':    'Clients',
  '/settings':   'Settings',
}

function getTitle(pathname) {
  if (PAGE_TITLES[pathname]) return PAGE_TITLES[pathname]
  if (pathname.startsWith('/leads/') && pathname !== '/leads/new') return 'Lead Details'
  if (pathname.startsWith('/clients/')) return 'Client Profile'
  return 'WeGrow CRM'
}

export default function TopBar({ onMenuClick }) {
  const { pathname } = useLocation()
  const [showNotif, setShowNotif] = useState(false)
  const {user} = useAuth()

  return (
    <header className="h-16 bg-[#fdf7ff]/90 backdrop-blur-md border-b border-[#e6e0e9] flex items-center px-6 gap-4 sticky top-0 z-10">
      {/* Mobile menu */}
      <button
        onClick={onMenuClick}
        className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-[#49454f] hover:bg-[#6750a4]/8 transition-colors"
      >
        <Menu size={20} />
      </button>

      {/* Page title */}
      <div className="flex-1">
        <h1 className="text-[18px] font-semibold text-[#1d1b20] leading-none">{getTitle(pathname)}</h1>
        <p className="text-[11px] text-[#7a7582] mt-0.5 tracking-[0.5px]">
          {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Search */}
      <div className="hidden sm:flex items-center gap-2 h-10 px-4 rounded-full bg-[#f2ecf4] border border-[#e6e0e9] text-[#7a7582] text-[13px] min-w-[200px] cursor-pointer hover:border-[#6750a4]/40 transition-colors">
        <Search size={15} />
        <span>Search...</span>
      </div>

      {/* Notifications */}
      <div className="relative">
        <button
          onClick={() => setShowNotif(!showNotif)}
          className="w-10 h-10 rounded-full flex items-center justify-center text-[#49454f] hover:bg-[#6750a4]/8 transition-colors relative"
        >
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#6750a4] rounded-full" />
        </button>

        {showNotif && (
          <div className="absolute right-0 top-12 w-72 bg-[#ece6ee] rounded-2xl shadow-xl border border-[#e6e0e9] z-50 overflow-hidden">
            <div className="px-4 py-3 border-b border-[#e6e0e9]">
              <p className="text-[13px] font-semibold text-[#1d1b20]">Notifications</p>
            </div>
            <div className="py-2">
              {[
                { text: 'Vikram Patel awaiting proposal review', time: '2h ago' },
                { text: 'BankRight meeting scheduled for tomorrow', time: '4h ago' },
                { text: 'EduSpark contract signed! 🎉', time: '2 days ago' },
              ].map((n, i) => (
                <div key={i} className="px-4 py-3 hover:bg-[#6750a4]/8 cursor-pointer transition-colors">
                  <p className="text-[13px] text-[#1d1b20]">{n.text}</p>
                  <p className="text-[11px] text-[#7a7582] mt-0.5">{n.time}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Avatar */}
      <Avatar initials={user.fullname.split(" ").map(word => word[0]).join("")} size="md" color="primary" />
    </header>
  )
}

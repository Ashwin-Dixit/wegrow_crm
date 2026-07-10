import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchLeads } from "../../store/lead/leadThunks";
import { fetchClients } from "../../store/client/clientThunks";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchLeads())
    dispatch(fetchClients())
  }, [])

  return (
    <div className="flex h-screen bg-[#fdf7ff] overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-30 md:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="fixed left-0 top-0 h-full z-40 md:hidden">
            <Sidebar collapsed={false} setCollapsed={() => setMobileSidebarOpen(false)} />
          </div>
        </>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar onMenuClick={() => setMobileSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="page-enter max-w-[1280px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

import React from 'react'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import LeadsPage from './pages/LeadsPage'
import LeadDetailPage from './pages/LeadDetailPage'
import ClientsPage from './pages/ClientsPage'
import ClientDetailPage from './pages/ClientDetailPage'
import AddLeadPage from './pages/AddLeadPage'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true,            element: <DashboardPage /> },
      { path: 'leads',          element: <LeadsPage /> },
      { path: 'leads/new',      element: <AddLeadPage /> },
      { path: 'leads/:id',      element: <LeadDetailPage /> },
      { path: 'clients',        element: <ClientsPage /> },
      { path: 'clients/:id',    element: <ClientDetailPage /> },
      { path: 'settings',       element: <div className="flex items-center justify-center h-64 text-[#7a7582]">Settings — Coming Soon</div> },
      { path: '*',              element: <Navigate to="/" replace /> },
    ],
  },
])

export default function AppRouter() {
  return <RouterProvider router={router} />
}

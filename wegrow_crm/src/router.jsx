import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast"
import { Provider } from "react-redux"
import AppLayout from "./components/layout/AppLayout";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import LeadsPage from "./pages/LeadsPage";
import LeadDetailPage from "./pages/LeadDetailPage";
import ClientsPage from "./pages/ClientsPage";
import ClientDetailPage from "./pages/ClientDetailPage";
import AddLeadPage from "./pages/AddLeadPage";
import AuthProvider from "./context/AuthProvider";
import AuthProtected from "./components/protection/AuthProtected";
import store from "./store/reduxStore";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    element: <AuthProtected />,
    children: [
      {
        path: "/",
        element: <AppLayout />,
        children: [
          { index: true, element: <DashboardPage /> },
          { path: "leads", element: <LeadsPage /> },
          { path: "leads/new", element: <AddLeadPage /> },
          { path: "leads/:id", element: <LeadDetailPage /> },
          { path: "clients", element: <ClientsPage /> },
          { path: "clients/:id", element: <ClientDetailPage /> },
          {
            path: "settings",
            element: (
              <div className="flex items-center justify-center h-64 text-[#7a7582]">
                Settings — Coming Soon
              </div>
            ),
          },
        ],
      },
    ],
  },
  { path: "*", element: <div>page not found</div> },
]);

export default function AppRouter() {
  return (
    <>
      <AuthProvider>
        <Provider store={store}>
          <Toaster position="top-center" reverseOrder={false} />
          <RouterProvider router={router} />
        </Provider>
      </AuthProvider>
    </>
  );
}

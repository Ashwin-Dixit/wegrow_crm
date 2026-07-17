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
import ResetPasswordPage from "./pages/ResetPasswordPage";
import DashboardPage from "./pages/DashboardPage";
import LeadsPage from "./pages/LeadsPage";
import LeadDetailPage from "./pages/LeadDetailPage";
import LeadPipelinePage from "./pages/LeadPipelinePage";
import ClientsPage from "./pages/ClientsPage";
import AddClientPage from "./pages/AddClientPage"
import ClientDetailPage from "./pages/ClientDetailPage";
import AddLeadPage from "./pages/AddLeadPage";
import ContactDetailsPage from "./pages/ContactDetailsPage"
import AuthProvider from "./context/AuthProvider";
import AuthProtected from "./components/protection/AuthProtected";
import store from "./store/reduxStore";
import ForgotPasswordPage from "./pages/ForgotPassword";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {path: "forgot-password",
    element: <ForgotPasswordPage/>
  },
  {path: "/reset-password",
    element: <ResetPasswordPage/>
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
          {path: "leads/pipeline", element: <LeadPipelinePage/>},
          { path: "leads/new", element: <AddLeadPage /> },
          { path: "leads/:id", element: <LeadDetailPage /> },
          { path: "clients", element: <ClientsPage /> },
          {path: "clients/new", element: <AddClientPage/>},
          { path: "clients/:id", element: <ClientDetailPage /> },
          {path: "contact", element: <ContactDetailsPage/>}
          
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

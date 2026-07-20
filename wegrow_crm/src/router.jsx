import React, {lazy, Suspense} from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast"
import { Provider } from "react-redux"
import AppLayout from "./components/layout/AppLayout";
const LoginPage = lazy(()=>import ("./pages/LoginPage"));
const SignupPage = lazy(()=>import ("./pages/SignupPage"));
const ResetPasswordPage = lazy(()=>import ("./pages/ResetPasswordPage"));
const DashboardPage = lazy(()=>import ("./pages/DashboardPage"));
const LeadsPage = lazy(()=>import ("./pages/LeadsPage"));
const LeadDetailPage = lazy(()=>import ("./pages/LeadDetailPage"));
const LeadPipelinePage = lazy(()=>import ("./pages/LeadPipelinePage"));
const ClientsPage = lazy(()=>import ("./pages/ClientsPage"));
const AddClientPage = lazy(()=>import ("./pages/AddClientPage"))
const ClientDetailPage = lazy(()=>import ("./pages/ClientDetailPage"));
const AddLeadPage = lazy(()=>import ("./pages/AddLeadPage"));
const ContactDetailsPage = lazy(()=>import ("./pages/ContactDetailsPage"))
import AuthProvider from "./context/AuthProvider";
import AuthProtected from "./components/protection/AuthProtected";
import store from "./store/reduxStore";
const ForgotPasswordPage = lazy(()=>import ("./pages/ForgotPassword"));
import Loader from "./components/ui/Loader"
import Page404 from "./pages/Page404";

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
  { path: "*", element: <Page404/> },
]);

export default function AppRouter() {
  return (
    <>
      <AuthProvider>
        <Provider store={store}>
          <Toaster position="top-center" reverseOrder={false} />
          <Suspense fallback={<div className="flex flex-col items-center justify-center h-screen">
            <Loader/>
            <h1 className="font-bold text-lg text-primary">Getting things in order...</h1>
            </div>}>
          <RouterProvider router={router} />
          </Suspense>
        </Provider>
      </AuthProvider>
    </>
  );
}

import { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import Loader from "../ui/Loader";
const AuthProtected = () => {
  const { user, loading } = useAuth();
  return (
    <>
      {loading && (
        <div className="flex flex-col items-center justify-center h-screen">
          <Loader />
          <h1 className="font-bold text-lg text-primary">
            Loading your workspace. Hold Tight...
          </h1>
        </div>
      )}
      {!loading && user && <Outlet />}
      {!loading && !user && <Navigate to="/login" replace />}
    </>
  );
};

export default AuthProtected;

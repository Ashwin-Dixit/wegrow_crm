import {useEffect} from 'react'
import { Outlet, Navigate  } from "react-router-dom"
import { useAuth } from "../../context/AuthProvider"
const AuthProtected = () => {
    const {user, loading} = useAuth()
    return (
        <>
        {loading && <div className="flex justify-center items-center h-screen">Loading...</div>}
        {!loading && user && <Outlet/>}
        {!loading && !user && <Navigate to='/login' replace/>}
        </>
    )
}

export default AuthProtected
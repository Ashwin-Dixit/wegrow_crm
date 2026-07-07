import {useEffect} from 'react'
import { Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthProvider"
const AuthProtected = () => {
    const {user} = useAuth()
    const navigate = useNavigate()
    useEffect(()=>{
        if(!user){
            navigate('/login')
        }
    }, [user])
    return (
        <>
        {user && 
            <Outlet/>
        }
        </>
    )
}

export default AuthProtected
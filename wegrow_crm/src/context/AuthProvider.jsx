import { createContext, useContext, useState, useEffect } from "react";
import { authUserService, signupService, loginService, logoutService } from "../services/authService";
const authContext = createContext();

const  AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        async function getUser(){
            try{
                const data = await authUserService()
                setUser(data.user)
            } catch(error){
                console.log(error)
                setUser(null)
            }
            finally{
                setLoading(false)
            }
        }
        getUser()
    }, [])

    const signup = async ({fullname, email, employeeId, password}) => {
        const data = await signupService({fullname, email, employeeId, password})
        setUser(data.user)
        return data
    }

    const login = async ({email, password}) => {
        const data = await loginService({email, password})
        setUser(data.user)
        return data
    }

    const logout = async () => {
        const data = await logoutService()
        setUser(null)
        return data
    }
    return(
        <authContext.Provider value={{signup, login, logout, user, loading}}>
            {children}
        </authContext.Provider>
    )
}
export const useAuth = () => {
    const context = useContext(authContext)
    if(!context){
        throw new Error("useAuth must be used within AuthProvider")
    }
    return context
}

export default AuthProvider
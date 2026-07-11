export async function authUserService(){
    try{
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/me`,{
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await res.json()
    if(!res.ok){
        throw new Error(data.message || "Failed to fetch user data")
    }
    return data
    }catch(e){
        console.error(e)
        throw e
    }    
}
export async function signupService({fullname, email, employeeId, password}){
    try{
    console.log(import.meta.env.VITE_BACKEND_URL)
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`,{
        method: 'POST',
        credentials: 'include',
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            fullname,
            email,
            employeeId,
            password
        }),    
    })
    const data = await res.json()
    console.log(data)
    if(!res.ok){
        throw new Error(data.message || "Failed to sign up")
    }
    return data
    }catch(e){
        console.error(e)
        throw e
    }
}

export async function loginService({email, password}){
    try{
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,{
        method: 'POST',
        credentials: 'include',
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify({
            email,
            password
        })
    })
    const data = await res.json()
    if(!res.ok){
        throw new Error(data.message || "Failed to login")
    }
    console.log(data)
    return data
    }catch(e){
        console.error(e)
        throw e
    }
}

export async function logoutService(){
    try{
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,{
        method: 'POST',
        credentials: 'include',
        headers:{
            "Content-Type": "application/json"
        }
    })
    const data = await res.json()
    if(!res.ok){
        throw new Error(data.message || "Failed to logout")
    }
    console.log(data)
    return data
    }catch(e){
        console.error(e)
        throw e
    }
}
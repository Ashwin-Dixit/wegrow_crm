export async function authUserService(){
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/me`,{
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await res.json()
    return data
    
}
export async function signupService({fullname, email, employeeId, password}){
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
    return data
}

export async function loginService({email, password}){
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
    console.log(data)
    return data
}

export async function logoutService(){
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,{
        method: 'POST',
        credentials: 'include',
        headers:{
            "Content-Type": "application/json"
        }
    })
    const data = await res.json()
    return data
}
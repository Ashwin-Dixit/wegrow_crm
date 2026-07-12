export async function getProjectsForClient(clientId){
    console.log("inside get projects service")
    try{
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/project/${clientId}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    const data = await res.json()
    console.log(data)
    if(!res.ok){
        throw new Error(data.message || "Failed to fetch projects")
    }
    return data
    }catch(e){
        console.error(e)
        throw e
    }
}
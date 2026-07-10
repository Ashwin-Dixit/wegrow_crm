export async function getClientsService(){
    console.log("inside client service")
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/client`,{
        method: 'GET',
        credentials: 'include',
    })
    const data = await res.json()
    console.log(data)
    return data
}
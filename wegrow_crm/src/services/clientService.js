export async function getClientsService(){
    console.log("inside client service")
    try{
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/client`,{
        method: 'GET',
        credentials: 'include',
    })
    const data = await res.json()
    if(!res.ok){
        throw new Error(data.message || "Failed to fetch clients")
    }
    console.log(data)
    return data
    }catch(e){
        console.error(e)
        throw e
    }
}

export async function createClientService(clientData){      //clientData = {name,company,status,email,phone,notes,contractStart,contractEnd,contractValue}
    console.log("inside create client service", clientData)
    try{
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/client/create`,{
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(clientData),
    })
    const data = await res.json()
    if(!res.ok){
        throw new Error(data.message || "Failed to create client")
    }
    console.log(data)
    return data
    }catch(e){
        console.error(e)
        throw e
    }
}

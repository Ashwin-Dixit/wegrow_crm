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

export async function createClientService(clientData){      //clientData = 
    console.log("inside create client service", clientData)
    const {name,company,industry,status,email,phone,
        notes,contractStart,contractEnd,contractValue, accountManager} = clientData
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

export async function updateClientService({clientId, updates}){
    console.log("inside update client service", clientId, updates)
    const {name,company,industry,status,email,phone,
        notes,contractStart,contractEnd,contractValue, accountManager} = updates
    try{
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/client/update/${clientId}`,{
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
    })
    const data = await res.json()
    console.log(data)
    if(!res.ok){
        throw new Error(data.message || "Failed to update client")
    }
    return data
    }catch(e){
        console.error(e)
        throw e
    }
}
export async function deleteClientService(clientId){
    console.log("inside delete client service", clientId)
    try{
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/client/delete/${clientId}`,{
        method: 'DELETE',
        credentials: 'include',
    })
    const data = await res.json()
    console.log(data)
    if(!res.ok){
        throw new Error(data.message || "Failed to delete client")
    }
    return data
    }catch(e){
        console.error(e)
        throw e
    }
}

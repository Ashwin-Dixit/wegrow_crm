import {apiFetch} from "./apiHelper";
export async function getClientsService(){
    try{
    const res = await apiFetch(`${import.meta.env.VITE_BACKEND_URL}/api/client`,{
        method: 'GET',
        credentials: 'include',
    })
    const data = await res.json()
    if(!res.ok){
        throw new Error(data.message || "Failed to fetch clients")
    }
    return data
    }catch(e){
        console.error(e)
        throw e
    }
}

export async function createClientService(clientData){
    const {name,company,industry,status,email,phone,
        notes,contractStart,contractEnd,contractValue, accountManager} = clientData
    try{
    const res = await apiFetch(`${import.meta.env.VITE_BACKEND_URL}/api/client/create`,{
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
    return data
    }catch(e){
        console.error(e)
        throw e
    }
}

export async function updateClientService({clientId, updates}){
    const {name,company,industry,status,email,phone,
        notes,contractStart,contractEnd,contractValue, accountManager} = updates
    try{
    const res = await apiFetch(`${import.meta.env.VITE_BACKEND_URL}/api/client/update/${clientId}`,{
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
    })
    const data = await res.json()
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
    try{
    const res = await apiFetch(`${import.meta.env.VITE_BACKEND_URL}/api/client/delete/${clientId}`,{
        method: 'DELETE',
        credentials: 'include',
    })
    const data = await res.json()
    if(!res.ok){
        throw new Error(data.message || "Failed to delete client")
    }
    return data
    }catch(e){
        console.error(e)
        throw e
    }
}

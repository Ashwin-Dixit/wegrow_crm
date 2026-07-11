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

export async function createClientService(clientData){      //clientData = {name,company,status,email,phone,notes,contractStart,contractEnd,contractValue}
    console.log("inside create client service", clientData)
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/client/create`,{
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(clientData),
    })
    const data = await res.json()
    console.log(data)
    return data
}
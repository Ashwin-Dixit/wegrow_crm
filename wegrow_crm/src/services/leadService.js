export async function addLeadService({name, company, email, phone, notes, source}){
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/lead/create`,{
        method: 'POST',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            company,
            email,
            phone,
            notes,
            source
        })
    })
    const data = await res.json()
    console.log(data)
    return data
}
export async function getLeadService(){
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/lead`,{
        method: 'GET',
        credentials: 'include'
    })
    const data = await res.json()
    console.log(data)
    return data
}
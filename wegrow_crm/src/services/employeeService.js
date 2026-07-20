import {apiFetch} from "./apiHelper"
export async function fetchEmployees(){
    try{
        const res = await apiFetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/employee`,
            {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )
        const data = await res.json()
        if(!res.ok){
            throw new Error(data.message || "failed to fetch")
        }
        return data
    }
    catch(error){
        console.log(error)
        throw error
    }
}
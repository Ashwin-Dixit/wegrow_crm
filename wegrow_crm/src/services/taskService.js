import {apiFetch} from "./apiHelper"
export async function createTaskService(taskData){
    const {
      title,
      description,
      status,
      priority,
      projectId
    } = taskData
    try{
    const res = await apiFetch(`${import.meta.env.VITE_BACKEND_URL}/api/task/create`,{
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title,
            description,
            status,
            priority,
            projectId
        }),
    })
    const data = await res.json()
    if(!res.ok){
        throw new Error(data.message || "Failed to create task")
    }
    return data
    }catch(e){
        console.error(e)
        throw e
    }
}

export async function updateTaskStatusService(taskData){
    const {
      id,
      status,
    } = taskData
    try{
    const res = await apiFetch(`${import.meta.env.VITE_BACKEND_URL}/api/task/${id}/update-status`,{
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            status,
        }),
    })
    const data = await res.json()
    if(!res.ok){
        throw new Error(data.message || "Failed to update task status")
    }
    return data
    }catch(e){
        console.error(e)
        throw e
    }
}
export async function deleteTaskService(taskId){
    try{
        const res = await apiFetch(`${import.meta.env.VITE_BACKEND_URL}/api/task/${taskId}`,{
            method: 'DELETE',
            credentials: 'include',
        })
        const data = await res.json()
        if(!res.ok){
            throw new Error(data.message || "Failed to delete task")
        }
        return data
    } catch(e){
        console.error(e)
        throw e
    }
}

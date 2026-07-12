export async function createTaskService(taskData){
    console.log("inside create task service", taskData)
    const {
      title,
      description,
      status,
      priority,
      projectId
    } = taskData
    try{
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/task/create`,{
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
    console.log(data)
    return data
    }catch(e){
        console.error(e)
        throw e
    }
}

export async function updateTaskStatusService(taskData){
    console.log("inside update task status service", taskData)
    const {
      id,
      status,
    } = taskData
    try{
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/task/${id}/update-status`,{
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
    console.log(data)
    return data
    }catch(e){
        console.error(e)
        throw e
    }
}
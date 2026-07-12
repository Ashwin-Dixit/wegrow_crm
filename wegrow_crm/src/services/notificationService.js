export async function fetchNotifications() {
    try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/notification`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include"
        })
        const data= await res.json()
        if(!res.ok){
            throw new Error("Error fetching notifications")
        }
        return data
    } catch (error) {
        throw error
    }
}

export async function markNotificationsRead(notificationIds){
  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/notification/read`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      credentials:"include",
      body:JSON.stringify({notificationIds})
    })
    const data= await res.json()
    if(!res.ok){
      throw new Error("Error marking notifications as read")
    }
    return data
  } catch (error) {
    throw error
  }
}
    
import { apiFetch } from "./apiHelper";
export async function getProjectsForClient(clientId) {
  console.log("inside get projects service");
  try {
    const res = await apiFetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/project/${clientId}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const data = await res.json();
    console.log(data);
    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch projects");
    }
    return data;
  } catch (e) {
    console.error(e);
    throw e;
  }
}
export async function addProjectService(projectDetails) {
  const { title, description, status, startDate, deadline, clientId } = projectDetails;
  console.log("inside add project service", projectDetails);
  try {
    const res = await apiFetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/project/add-project`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectDetails),
      },
    );
    const data = await res.json();
    console.log(data);
    if (!res.ok) {
      throw new Error(data.message || "Failed to add project");
    }
    return data;
  } catch (e) {
    console.error(e);
    throw e;
  }
}
export async function deleteProjectService(id){
  try{
    const res = await apiFetch(`${import.meta.env.VITE_BACKEND_URL}/api/project/${id}`,{
      method: 'DELETE',
      credentials: 'include'
    })
    const data = await res.json()
    console.log(data)
    if(!res.ok){
      throw new Error("Failed to delete")
    }
    return data
  } catch(error){
    throw error
  }
}
export async function updateProjectService(projectDetails){
  const {id, name, description, status, start_date, deadline, clientId} = projectDetails
  try{
    const res = await apiFetch(`${import.meta.env.VITE_BACKEND_URL}/api/project/${projectDetails.id}`,{
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(projectDetails)
    })
    const data = await res.json()
    console.log(data)
    if(!res.ok){
      throw new Error("Failed to update")
    }
    return data
  } catch(error){
    throw error
  }
}
export async function updateProjectStatusService(projectDetails){
  const {id, status} = projectDetails
  try{
    const res = await apiFetch(`${import.meta.env.VITE_BACKEND_URL}/api/project/${projectDetails.id}/update-status`,{
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(projectDetails)
    })
    const data = await res.json()
    console.log(data)
    if(!res.ok){
      throw new Error("Failed to update")
    }
    return data
  } catch(error){
    throw error
  }
}

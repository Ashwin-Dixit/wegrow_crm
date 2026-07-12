export async function addLeadService({
  name,
  company,
  email,
  phone,
  notes,
  source,
}) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/lead/create`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          company,
          email,
          phone,
          notes,
          source,
        }),
      },
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to add lead");
    }
    console.log(data);
    return data;
  } catch (e) {
    console.error(e);
    throw e;
  }
}
export async function getLeadService() {
  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/lead`, {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch leads");
    }
    console.log(data);
    return data;
  } catch (e) {
    console.error(e);
    throw e;
  }
}
export async function deleteLeadService(leadId) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/lead/delete/${leadId}`,
      {
        method: "DELETE",
        credentials: "include",
      },
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to delete lead");
    }
    console.log(data);
    return data;
  } catch (e) {
    console.error(e);
    throw e;
  }
}
export async function updateLeadService(leadId, updates) {
  console.log("inside update service", updates);
  try {
    const { name, company, email, phone, notes, status, source } = updates;
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/lead/update/${leadId}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      },
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to update lead");
    }
    console.log(data);
    return data; //contain lead:newLead from api
  } catch (e) {
    console.error(e);
    throw e;
  }
}

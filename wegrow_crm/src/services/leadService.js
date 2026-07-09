export async function addLeadService({
  name,
  company,
  email,
  phone,
  notes,
  source,
}) {
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
  console.log(data);
  return data;
}
export async function getLeadService() {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/lead`, {
    method: "GET",
    credentials: "include",
  });
  const data = await res.json();
  console.log(data);
  return data;
}
export async function deleteLeadService(leadId) {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/lead/delete/${leadId}`,
    {
      method: "DELETE",
      credentials: "include",
    },
  );
  const data = await res.json();
  console.log(data);
  return data;
}
export async function updateLeadService(leadId, updates) {
    console.log("inside update service", updates)
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
  const data = await res.json()
  console.log(data)
  return data                         //contain lead:newLead from api
}

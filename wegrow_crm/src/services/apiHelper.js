export async function apiFetch(url, options = {}) {
  let res = await fetch(url, {
    ...options,
    credentials: "include",
  });

  if (res.status === 401) {
    const refreshRes = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/auth/refresh`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    if (!refreshRes.ok) {
      throw new Error("Session expired");
    }

    res = await fetch(url, {
      ...options,
      credentials: "include",
    });
  }

  return res;
}
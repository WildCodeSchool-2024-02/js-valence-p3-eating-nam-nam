export default async function login(formData) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: formData.get("email"),
      password: formData.get("password"),
    }),
  });

  let data;
  if (res.headers.get("Content-Type").includes("application/json")) {
    data = await res.json();
  }
  if (!res.ok) {
    throw new Error(data?.message || "Unknown error while logging in");
  }
  return data;
}

export async function register(formData) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users`, {
    method: "POST",
    credentials: "include",

    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: formData.get("email"),
      username: formData.get("username"),
      name: formData.get("name"),
      lastName: formData.get("last_name"),
      password: formData.get("password"),
      birthdate: formData.get("birthdate"),
    }),
  });

  let data;
  if (res.headers.get("Content-Type").includes("application/json")) {
    data = await res.json();
  }
  if (!res.ok) {
    throw new Error(data?.message || "Unknown error while registering");
  }
  return data;
}

export async function logout() {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/logout`, {
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Couldn't log out");
  }
}

export async function checkAuth() {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/verify-auth`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.ok;
  } catch (err) {
    console.error(err);
    return false;
  }
}

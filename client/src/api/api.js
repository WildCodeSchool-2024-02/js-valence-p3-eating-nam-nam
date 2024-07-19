export default async function login(formData) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
    method: "post",
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
    throw new Error(data?.message || "Unknown error while loggin in");
  }
  return data;
}

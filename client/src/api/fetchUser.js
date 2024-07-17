export default async function fetchUserById(id) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/users/${id}`
  );
  if (!response.ok) {
    throw new Error("Erreur lors du chargement de l'utilisateur");
  }
  const userData = await response.json();
  return userData;
}

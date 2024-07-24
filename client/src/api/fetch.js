export async function fetchUserById(id) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/users/${id}`
  );
  if (!response.ok) {
    throw new Error("Erreur lors du chargement de l'utilisateur");
  }
  const userData = await response.json();
  return userData;
}

export async function fetchUsers() {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users`);
  if (!response.ok) {
    throw new Error("Erreur lors du chargement des utilisateurs");
  }
  const userData = await response.json();
  return userData;
}

export async function fetchDeleteUserById(id) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/users/${id}`,
    {
      method: "DELETE",
    }
  );
  if (!response.ok) {
    throw new Error("Erreur lors de la suppression de l'utilisateur");
  }
  return true;
}

export async function fetchRecettes() {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/recettes`);
  if (!response.ok) {
    throw new Error("Erreur lors du chargement des recettes");
  }
  const recetteData = await response.json();
  return recetteData;
}

export async function fetchRecetteById(id) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/recettes/${id}`
  );
  if (!response.ok) {
    throw new Error("Erreur lors du chargement de la recette");
  }
  const recetteData = await response.json();
  return recetteData;
}

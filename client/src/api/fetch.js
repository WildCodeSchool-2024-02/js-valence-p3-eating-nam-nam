export async function fetchUserById(id) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/users/${id}`,
    { credentials: "include" }
  );
  if (!response.ok) {
    throw new Error("Erreur lors du chargement de l'utilisateur");
  }
  const userData = await response.json();
  return userData;
}

export async function fetchUsers() {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users`, {
    credentials: "include",
  });
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
      credentials: "include",
    }
  );
  if (!response.ok) {
    throw new Error("Erreur lors de la suppression de l'utilisateur");
  }
  return true;
}

export async function fetchRecettes() {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/recettes`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Erreur lors du chargement des recettes");
  }
  const recetteData = await response.json();
  return recetteData;
}

export async function fetchDeleteRecetteById(id) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/recettes/${id}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );
  if (!response.ok) {
    throw new Error("Erreur lors de la suppression de la recette");
  }
  return true;
}

export async function fetchPatchRecetteById(id) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/recettes/${id}`,
    {
      method: "PATCH",
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Erreur lors de la confirmation de la recette");
  }
  return response.status === 204;
}

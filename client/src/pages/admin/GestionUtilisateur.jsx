import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import "../../styles/GestionUtilisateur.css";
import "../../styles/Admin.css";
import { fetchDeleteUserById, fetchUsers } from "../../api/fetch";

export function loader() {
  return fetchUsers();
}

function GestionUtilisateur() {
  const initialUsers = useLoaderData();
  const [users, setUsers] = useState(initialUsers);

  const handleDelete = async (id) => {
    try {
      const success = await fetchDeleteUserById(id);
      if (success) setUsers(users.filter((u) => u.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur", error);
    }
  };

  return (
    <div className="gestion-utilisateur columns">
      <div className="column">
        <h2>Nom Utilisateur:</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.username}
              <button type="button" onClick={() => handleDelete(user.id)}>
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default GestionUtilisateur;

import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import "../../styles/GestionUtilisateur.css";
import "../../styles/Admin.css";
import { fetchDeleteUserById, fetchUsers } from "../../api/fetch";

export function loader() {
  return fetchUsers();
}

function GestionUtilisateur() {
  const initialUsers = useLoaderData(); // Charge les données des utilisateurs via le loader
  const [users, setUsers] = useState(initialUsers); // Initialise l'état avec les utilisateurs chargés

  const handleDelete = async (id) => {
    try {
      const success = await fetchDeleteUserById(id);
      if (success) {
        setUsers((prevUsers) => prevUsers.filter((u) => u.id !== id));
      }
    } catch (error) {
      // Supprimé le bloc vide
    }
  };

  return (
    <div className="gestion-utilisateur">
      <div className="column">
        <h2>Nom Utilisateur:</h2>
        <ul>
          {users.map((user) => (
            <li className="li-gestion-utilisateur" key={user.id}>
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

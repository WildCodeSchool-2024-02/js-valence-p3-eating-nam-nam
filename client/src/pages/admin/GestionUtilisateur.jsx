import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import "../../styles/GestionUtilisateur.css";
import "../../styles/Admin.css";
import { fetchUsers } from "../../api/fetch";

export function loader() {
  return fetchUsers();
}

function GestionUtilisateur() {
  const initialUsers = useLoaderData();
  const [users, setUsers] = useState(initialUsers);

  const handleDelete = async (user) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setUsers(users.filter((u) => u.id !== user.id));
      } else {
        throw Error("Error message");
      }
    } catch (error) {
      throw Error("Error message");
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
              <button type="button" onClick={() => handleDelete(user)}>
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

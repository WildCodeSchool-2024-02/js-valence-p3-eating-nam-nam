import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import "../../styles/GestionUtilisateur.css";
import "../../styles/Admin.css";

function GestionUtilisateur() {
  const initialUsers = useLoaderData();
  const [users, setUsers] = useState(initialUsers);

  const handleDelete = async (user) => {
    try {
      const response = await fetch(`users/${user.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setUsers(users.filter((u) => u.id !== user.id));
      } else {
        throw Error("Error message");
      }
    } catch (error) {
      throw Error("Error message");
    }
  };

  const firstColumnUsers = users.slice(0, 10);
  const secondColumnUsers = users.slice(10, 20);

  return (
    <div className="gestion-utilisateur columns">
      <div className="column">
        <h2>Nom Utilisateur:</h2>
        <ul>
          {firstColumnUsers.map((user) => (
            <li key={user.id}>
              {user.username}
              <button type="button" onClick={() => handleDelete(user)}>
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="column">
        <h2>Nom Utilisateur:</h2>
        <ul>
          {secondColumnUsers.map((user) => (
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

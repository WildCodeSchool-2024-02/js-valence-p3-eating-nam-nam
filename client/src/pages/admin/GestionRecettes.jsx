import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import "../../styles/GestionRecettes.css";
import "../../styles/Admin.css";

function GestionRecettes() {
  const initialRecettes = useLoaderData();
  const [recettes, setRecettes] = useState(initialRecettes);

  const handleDelete = async (recette) => {
    try {
      const response = await fetch(`recettes/${recette.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setRecettes(recettes.filter((u) => u.id !== recette.id));
      } else {
        throw Error("Error message");
      }
    } catch (error) {
      throw Error("Error message");
    }
  };
  const handleConfirm = async (recette) => {
    try {
      const response = await fetch(`recettes/${recette.id}`, {
        method: "PUT",
      });

      if (response.ok) {
        setRecettes(recettes.filter((u) => u.id !== recette.id));
      } else {
        throw Error("Error message");
      }
    } catch (error) {
      throw Error("Error message");
    }
  };

  const firstColumnRecettes = recettes.slice(0, 8);
  const secondColumnRecettes = recettes.slice(8, 16);

  return (
    <div className="gestion-recette columns">
      <div className="column">
        <h2>Nom de la recette:</h2>
        <ul>
          {firstColumnRecettes.map((recette) => (
            <li key={recette.id}>
              {recette.title}

              <button type="button" onClick={() => handleConfirm(recette)}>
                Confirmer
              </button>
              <button type="button" onClick={() => handleDelete(recette)}>
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="column">
        <h2>Nom de la recette:</h2>
        <ul>
          {secondColumnRecettes.map((recette) => (
            <li key={recette.id}>
              {recette.title}

              <button type="button" onClick={() => handleConfirm(recette)}>
                Confirmer
              </button>
              <button type="button" onClick={() => handleDelete(recette)}>
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default GestionRecettes;

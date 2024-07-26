import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import "../../styles/GestionRecettes.css";
import "../../styles/Admin.css";
import {
  fetchDeleteRecetteById,
  fetchPatchRecetteById,
  fetchRecettes,
} from "../../api/fetch";

export function loader() {
  return fetchRecettes();
}

function GestionRecettes() {
  const initialRecettes = useLoaderData();
  const [recettes, setRecettes] = useState(initialRecettes);

  const handleDelete = async (id) => {
    try {
      const success = await fetchDeleteRecetteById(id);
      if (success) setRecettes(recettes.filter((r) => r.id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };
  const handleConfirm = async (id) => {
    try {
      const success = await fetchPatchRecetteById(id);
      if (success) setRecettes(recettes.filter((r) => r.id !== id));
      if (success) {
        setRecettes(
          recettes.map((recette) =>
            recette.id === id ? { ...recette, published: 1 } : recette
          )
        );
      } else {
        throw new Error("Erreur lors de la confirmation de la recette");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="gestion-recette columns">
      <div className="column">
        <h2>Nom de la recette:</h2>
        <ul>
          {recettes.map((recette) => (
            <li key={recette.id}>
              {recette.title}

              <button
                type="button"
                onClick={() => handleConfirm(recette.id)}
                disabled={recette.published === 1}
              >
                Confirmer
              </button>

              <button type="button" onClick={() => handleDelete(recette.id)}>
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

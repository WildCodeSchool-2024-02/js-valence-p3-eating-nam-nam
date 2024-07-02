import "./carteRecette.css";
import { Link } from "react-router-dom";

import Etoile from "./Etoile";

function CarteRecette({
  titre,
  img,
  auteur,
  tempsPreparation,
  tempsCuisson,
  id,
}) {
  return (
    <div className="recette">
      <Link
        aria-label={`Recette ${titre}`}
        to={`/recettes/${id}`}
        className="lien-recette"
      >
        <img src={img} alt={titre} className="recette-img" />
        <div className="titre-recette">
          <h2>{titre}</h2>
        </div>
        <div className="text-recette">
          <Etoile />
          <p className="temps">{tempsPreparation + tempsCuisson} minutes</p>
          <p className="auteur">{auteur}</p>
        </div>
      </Link>
    </div>
  );
}

export default CarteRecette;

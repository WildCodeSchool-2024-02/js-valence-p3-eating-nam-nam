import "./consulterRecette.css";
import PropTypes from "prop-types";
import Etoile from "./Etoile";

function ConsulterRecette({
  titre,
  img,
  auteur,
  tempsPreparation,
  tempsCuisson,
}) {
  return (
    <div className="recette">
      <img src={img} alt={titre} className="recette-img" />
      <div className="titre-recette">
        <h2>{titre}</h2>
      </div>
      <div className="text-recette">
        <Etoile />
        <p className="temps">{tempsPreparation + tempsCuisson} minutes</p>
        <p className="auteur">{auteur}</p>
      </div>
    </div>
  );
}

ConsulterRecette.propTypes = {
  titre: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  auteur: PropTypes.string.isRequired,
  tempsPreparation: PropTypes.string.isRequired,
  tempsCuisson: PropTypes.string.isRequired,
};

export default ConsulterRecette;

import { useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/consulterRecette.css";
import {
  champignons,
  citron,
  herbeDeProvence,
  lieuNoir,
  olivesVertes,
  poivre,
  sel,
  vinBlanc,
  autre,
} from "../components/import";

const ingrédients = [
  {
    id: 1,
    ingredient: "Champignons de Paris",
    img: champignons,
    quantité: "250g",
  },
  {
    id: 2,
    ingredient: "Citron",
    img: citron,
    quantité: "1",
  },
  {
    id: 3,
    ingredient: "Herbe de provence",
    img: herbeDeProvence,
    quantité: "",
  },
  {
    id: 4,
    ingredient: "Lieu-Noir",
    img: lieuNoir,
    quantité: "4 filets",
  },
  {
    id: 5,
    ingredient: "Olives vertes dénoyautées",
    img: olivesVertes,
    quantité: "120g",
  },
  {
    id: 6,
    ingredient: "Poivre noir",
    img: poivre,
    quantité: "1 pincée",
  },
  { id: 7, ingredient: "Sel", img: sel, quantité: "1 pincée" },
  {
    id: 8,
    ingredient: "Vin blanc",
    img: vinBlanc,
    quantité: "20 cl",
  },
  {
    id: 9,
    ingredient: "Autres épices à poisson selon vos goûts",
    img: autre,
    quantité: "",
  },
];

const instructions = [
  { step: 1, ordre: "Etape 1", description: "Préchauffez le four à 180°C." },
  {
    step: 2,
    ordre: "Etape 2",
    description: "Mettre les filets de cabillaud dans un plat.",
  },
  {
    step: 3,
    ordre: "Etape 3",
    description: "Émincer les champignons et en recouvrir le poisson.",
  },
  {
    step: 4,
    ordre: "Etape 4",
    description:
      "Ajouter les olives vertes, le vin, le jus de citron, les herbes de provences et les épices (rester dans les épices douces pour ne pas contrarier le goût des olives). Saler et poivrer.",
  },
  {
    step: 5,
    ordre: "Etape 5",
    description: "Recouvrir le plat de papier d'aluminium et enfourner.",
  },
  {
    step: 6,
    ordre: "Etape 6",
    description:
      "Cuire jusqu'à ce que la chair de poisson se détache facilement (1h00 si poisson surgelé).",
  },
];

function ConsulterRecette() {
  const { id } = useParams();
  const recette = ingrédients.find((r) => r.id === Number(id));

  const [avis, setAvis] = useState([]);
  const [nouvelAvis, setNouvelAvis] = useState("");
  const [auteurAvis, setAuteurAvis] = useState("");

  const soumettreAvis = () => {
    if (nouvelAvis.trim() !== "") {
      const nouvelAvisComplet = `${auteurAvis}: ${nouvelAvis}`;
      setAvis([...avis, nouvelAvisComplet]);
      setNouvelAvis("");
      setAuteurAvis("");
    }
  };

  if (!recette) {
    return <div>Recette non trouvée</div>;
  }

  return (
    <div className="main-content">
      <h1>Recette avec : </h1>
      <h2 className="ingredient-titre">Ingrédients</h2>
      <ul>
        <div className="container-grid">
          {ingrédients.map((ingrédient) => (
            <li className="recette-container" key={ingrédient.id}>
              <img
                className="image-ingredients"
                src={ingrédient.img}
                alt={ingrédient.ingredient}
              />
              <p className="ingredient-quantité">{ingrédient.quantité}</p>
              <p>{ingrédient.ingredient}</p>
            </li>
          ))}
        </div>
      </ul>
      <h2>Étapes de Préparation</h2>
      <ol>
        {instructions.map((instruction) => (
          <li className="etape-container" key={instruction.step}>
            <span className="ordre">{instruction.ordre}</span>
            <span className="description">{instruction.description}</span>
          </li>
        ))}
      </ol>
      <div className="avis-container">
        <h3>Donnez votre avis</h3>
        <div className="avis-input-container">
          <textarea
            value={nouvelAvis}
            onChange={(e) => setNouvelAvis(e.target.value)}
            placeholder="Écrivez votre avis ici..."
          />
          <input
            type="text"
            value={auteurAvis}
            onChange={(e) => setAuteurAvis(e.target.value)}
            placeholder="Votre nom"
          />
        </div>
        <button type="button" onClick={soumettreAvis}>
          Soumettre
        </button>
      </div>

      {avis.length > 0 && (
        <div>
          <h3>Avis des utilisateurs :</h3>
          <ul>
            {avis.map((unAvis) => (
              <li key={unAvis}>{unAvis}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ConsulterRecette;

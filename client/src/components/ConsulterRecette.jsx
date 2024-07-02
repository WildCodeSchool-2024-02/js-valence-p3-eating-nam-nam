import { useParams } from "react-router-dom";
import "./consulterRecette.css";
import champignons from "../assets/images/champignons-de-paris.png";
import citron from "../assets/images/citron.png";
import herbeDeProvence from "../assets/images/herbe-de-provence.jpg";
import lieuNoir from "../assets/images/Lieu-noir.png";
import olivesVertes from "../assets/images/olives-vertes.png";
import poivre from "../assets/images/poivre-noir.png";
import sel from "../assets/images/sel.png";
import vinBlanc from "../assets/images/vin-blanc.png";
import autre from "../assets/images/autre.png";

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
      "Ajouter les olives vertes, le vin, le jus de citron, les herbes de provences et les épices(rester dans les épices douces pour ne pas contrarier le goût des olives). Saler et poivrer.",
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
      "Cuire jusqu'à ce que la chair de poisson se détache facilement (1h00 si poisson surgelé.)",
  },
];

function ConsulterRecette() {
  const { id } = useParams(); // Récupérer l'ID de la recette depuis les paramètres d'URL
  // Trouver la recette correspondant à l'ID
  const recette = ingrédients.find((r) => r.id === Number(id));
  if (!recette) {
    return <div>Recette non trouvée</div>; // Gérer le cas où la recette n'est pas trouvée
  }
  return (
    <div>
      <h1>Recette de </h1>
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
      <h3>Donnez votre avis</h3>
    </div>
  );
}

export default ConsulterRecette;

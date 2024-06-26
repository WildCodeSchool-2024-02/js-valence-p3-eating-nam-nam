import ConsulterRecette from "./ConsulterRecette";
import "./consulterRecettesGenerales.css";
import cabillaudOlives from "../assets/images/Cabillaud aux olives et au vin blanc.jpg";
import cabillaudChorizo from "../assets/images/Cabillaud au chorizo.jpg";
import gratincabillaud from "../assets/images/Gratin de cabillaud aux olives.jpg";

const recettes = [
  {
    id: 1,
    img: cabillaudOlives,
    titre: "Cabillaud aux olives et au vin blanc",
    auteur: "Céline",
    tempsPreparation: 10,
    tempsCuisson: 30,
  },
  {
    id: 2,
    img: cabillaudChorizo,
    titre: "Gratin de cabillaud aux olives",
    auteur: "Clarelle",
    tempsPreparation: 20,
    tempsCuisson: 20,
  },
  {
    id: 3,
    img: gratincabillaud,
    titre: "Cabillaud au chorizo",
    auteur: "Romina123",
    tempsPreparation: 15,
    tempsCuisson: 20,
  },
];

function ConsulterRecettesGenerales() {
  return (
    <div className="recettes-generales">
      {recettes.map((recette) => (
        <ConsulterRecette
          key={recette.id}
          img={recette.img}
          titre={recette.titre}
          auteur={recette.auteur}
          tempsPreparation={recette.tempsPreparation}
          tempsCuisson={recette.tempsCuisson}
        />
      ))}
    </div>
  );
}

export default ConsulterRecettesGenerales;

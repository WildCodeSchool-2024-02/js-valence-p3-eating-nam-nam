import CarteRecette from "./CarteRecette";
import "./carteRecette.css";
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

function ListeRecettes() {
  return (
    <div>
      <div className="titre-resultat">
        <h1>Cabillaud</h1>
        <p className="resultat">101 résultats</p>
      </div>
      <div className="recettes-generales">
        {recettes.map((recette) => (
          <CarteRecette
            key={recette.id}
            id={recette.id}
            img={recette.img}
            titre={recette.titre}
            auteur={recette.auteur}
            tempsPreparation={recette.tempsPreparation}
            tempsCuisson={recette.tempsCuisson}
          />
        ))}
      </div>
    </div>
  );
}

export default ListeRecettes;

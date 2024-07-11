import { useOutletContext } from "react-router-dom";
import CarteRecette from "./CarteRecette";
import "./carteRecette.css";
import {
  cabillaudauchorizo,
  gratindecabillaudauxolives,
  cabillaudauxolivesetauvinblanc,
} from "./import";

const recettes = [
  {
    id: 1,
    img: cabillaudauxolivesetauvinblanc,
    titre: "Cabillaud aux olives et au vin blanc",
    auteur: "Céline",
    tempsPreparation: 10,
    tempsCuisson: 30,
  },
  {
    id: 2,
    img: gratindecabillaudauxolives,
    titre: "Gratin de cabillaud aux olives",
    auteur: "Clarelle",
    tempsPreparation: 20,
    tempsCuisson: 20,
  },
  {
    id: 3,
    img: cabillaudauchorizo,
    titre: "Cabillaud au chorizo",
    auteur: "Romina123",
    tempsPreparation: 15,
    tempsCuisson: 20,
  },
];

function ListeRecettes() {
  const searchQuery = useOutletContext();
  const filteredRecettes = recettes.filter(
    (recette) =>
      recette.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recette.auteur.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="titre-resultat">
        <h1>{searchQuery}</h1>
        <p className="resultat">
          {filteredRecettes.length}{" "}
          {filteredRecettes.length > 1 ? "résultats" : "résultat"}
        </p>
      </div>
      <div className="recettes-generales">
        {filteredRecettes.map((recette) => (
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
    </>
  );
}

export default ListeRecettes;

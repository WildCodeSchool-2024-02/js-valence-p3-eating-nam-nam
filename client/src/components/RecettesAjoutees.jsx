import CarteRecette from "./CarteRecette";
import "./RecettesAjoutees.css";

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

function RecettesAjoutees() {
  return (
    <>
      <div className="title_1">
        <h1>Mes dernières recettes ajoutées sur le site</h1>
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
    </>
  );
}

export default RecettesAjoutees;

import "./RecettesFavorites.css";
import { burger, vegan, cabillaud } from "./import";

const recettes = [
  { type: "Viandes", img: burger, alt: "burger" },
  { type: "Poissons", img: cabillaud, alt: "poisson" },
  { type: "Vegan", img: vegan, alt: "vegan" },
];

function RecettesFavorites() {
  return (
    <>
      <div className="para">
        <p>Ici vous pouvez consulter vos recettes favorites</p>
      </div>
      <section className="flex">
        {recettes.map(({ type, img, alt }) => (
          <div key={type}>
            <button type="button">{type}</button>
            <br />
            <img src={img} alt={alt} />
          </div>
        ))}
      </section>
    </>
  );
}

export default RecettesFavorites;

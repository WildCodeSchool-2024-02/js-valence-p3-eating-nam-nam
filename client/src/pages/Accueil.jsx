import "../styles/Accueil.css";
import {
  table,
  temoin1,
  temoin2,
  temoin3,
  temoin4,
} from "../components/import";

export default function Accueil() {
  return (
    <div className="Accueil">
      <h2>Partagez vos recettes et découvrez de nouvelles saveurs</h2>

      <img id="table" src={table} alt="table" />

      <h2>Rejoignez notre communauté de passionnés de cuisine</h2>
      <div className="connect">
        <button type="button" className="button">
          S'inscrire
        </button>
        <button type="button" className="button">
          Se connecter
        </button>
      </div>
      <h2>Les témoignages de nos différends abonnés</h2>
      <section>
        <ul className="temoins">
          <li>
            <img src={temoin1} alt="sophie M" />
            <p>
              "Pouvoir enregistrer mes recettes préférées est un vrai plus.Je
              n'ai plus besoin de chercher partout mes plats favoris. Tout est
              bien organisé dans ma collection personnelle"-sophieM.
            </p>
          </li>
          <li>
            <img src={temoin2} alt="lucas D" />
            <p>
              "Les boutons j'aime et Partager sont super pratiques.Je peux
              montrer à mes amis ce que j'ai aimé et peuvent faire de même.C'est
              une excellente manière de découvrir de nouvelles recettes."-LucasD
            </p>
          </li>
          <li>
            <img src={temoin3} alt="Vincent k" />
            <p>
              "partager mes recettes sur ce site est un vrai plaisir.La
              communauté est acceuillante et j'ai recu tellement de commentaire
              positifs et constructifs.Ca m' encourage à cuisiner encore
              plus!"-VincentK
            </p>
          </li>
          <li>
            <img src={temoin4} alt="julie p" />
            <p>
              "J'adore utiliser ce site pour rechercher des recettes par
              ingrédient.Il suffit d'entrer ce que j'ai dans mon frigo et il me
              propose des plats délicieux à préparer.Cela m'a sauvé de
              nombreuses fois quaand je ne savais pas quoi cuisiner."-JulieP
            </p>
          </li>
        </ul>
      </section>
    </div>
  );
}

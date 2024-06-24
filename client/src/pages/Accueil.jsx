import "../styles/Accueil.css";
import table from "../assets/images/DSC_4636-1024x682 (1).jpg";
import temoin1 from "../assets/images/photo profil temoignages femme.jpg";
import temoin2 from "../assets/images/photo profil homme bis.jpg";
import temoin3 from "../assets/images/temoin3.webp";
import temoin4 from "../assets/images/temoin4.webp";

export default function Accueil() {
  return (
    <div>
      <div className="Accueil">
        <h2>Partagez vos recettes et découvrez de nouvelles saveurs</h2>
        <img src={table} alt="temoin 1" />

        <h2>Rejoignez notre communauté de passionnés de cuisine</h2>
        <div className="connect">
          <input
            type="text"
            name="S'inscrire"
            id="sincrire"
            placeholder="S'inscrire"
          />
          <input
            type="text"
            name="Se connecter"
            id="seconnecter"
            placeholder="Se connecter"
          />
        </div>
        <h2>Les témoignages de nos différends abonnés</h2>
        <section>
          <ul className="temoins">
            <li>
              <img src={temoin1} alt="temoignage1" />
              <p>
                "Pouvoir enregistrer mes recettes préférées est un vrai plus.Je
                n'ai plus besoin de chercher partout mes plats favoris. Tout est
                bien organisé dans ma collection personnelle"-sophieM.
              </p>
            </li>
            <li>
              <img src={temoin2} alt="temoignage2" />
              <p>
                "Les boutons j'aime et Partager sont super pratiques.Je peux
                montrer à mes amis ce que j'ai aimé et peuvent faire de
                même.C'est une excellente manière de découvrir de nouvelles
                recettes."-LucasD
              </p>
            </li>
            <li>
              <img src={temoin3} alt="temoignage3" />
              <p>
                "partager mes recettes sur ce site est un vrai plaisir.La
                communauté est acceuillante et j'ai recu tellement de
                commentaire positifs et constructifs.Ca m' encourage à cuisiner
                encore plus!"-VincentK
              </p>
            </li>
            <li>
              <img src={temoin4} alt="temoignage4" />
              <p>
                "J'adore utiliser ce site pour rechercher des recettes par
                ingrédient.Il suffit d'entrer ce que j'ai dans mon frigo et il
                me propose des plats délicieux à préparer.Cela m'a sauvé de
                nombreuses fois quaand je ne savais pas quoi cuisiner."-JulieP
              </p>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}

import { NavLink } from "react-router-dom";
import { accueil, add, dernière, favoris } from "./import";
import "../styles/Footer.css";

export default function Footer() {
  return (
    <div className="button_footer">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "active" : null)}
      >
        <img src={accueil} width="30px" alt="Accueil" />
      </NavLink>
      <NavLink
        to="/dernieres-recettes"
        className={({ isActive }) => (isActive ? "active" : null)}
      >
        <img src={dernière} width="30px" alt="Dernières recettes" />
      </NavLink>
      <NavLink
        to="/RecettesFavorites"
        className={({ isActive }) => (isActive ? "active" : null)}
      >
        <img src={favoris} width="30px" alt="Mes recettes favorites" />
      </NavLink>
      <NavLink
        to="/RecettesAjoutees"
        className={({ isActive }) => (isActive ? "active" : null)}
      >
        <img src={add} width="30px" alt="Ajouter une recette" />
      </NavLink>
    </div>
  );
}

import { Link, useLocation } from "react-router-dom";
import "./Footer.css";
import { accueil, dernière, favoris, add } from "./import";

export default function Footer() {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <footer>
            <Link to="/" className={isActive("/") ? "active" : null}>
                <img src={accueil} width="30px" alt="Accueil" />
            </Link>
            <Link to="/dernieres-recettes" className={isActive("/dernieres-recettes") ? "active" : null}>
                <img src={dernière} width="30px" alt="Dernières recettes" />
            </Link>
            <Link to="/RecettesFavorites" className={isActive("/RecettesFavorites") ? "active" : null}>
                <img src={favoris} width="30px" alt="Mes recettes favorites" />
            </Link>
            <Link to="/RecettesAjoutees" className={isActive("/RecettesAjoutees") ? "active" : null}>
                <img src={add} width="30px" alt="Ajouter une recette" />
            </Link>
        </footer>
    );
}

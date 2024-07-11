import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";
import { accueil, add, dernière, login, logo, favoris } from "./import";

function Navbar() {
  return (
    <>
      <header>
        <nav>
          <img className="navbar_logo" src={logo} alt="logo" />
          <div className="nav_content">
            <input
              className="search_bar"
              type="text"
              name="search_bar"
              id="search_bar"
              placeholder="Rechercher une recette, un ingrédient ..."
            />
            <div className="button_menu">
              <NavLink to="/" className="nav_link">
                <img src={accueil} width="30px" alt="Accueil" /> Accueil
              </NavLink>
              <NavLink to="/" className="nav_link">
                <img src={dernière} width="30px" alt="Dernières recettes" />{" "}
                Dernières recettes ajoutées
              </NavLink>
              <NavLink to="/" className="nav_link">
                <img src={favoris} width="30px" alt="Mes recettes favorites" />{" "}
                Mes recettes favorites
              </NavLink>
              <NavLink to="/" className="nav_link">
                <img src={add} width="30px" alt="Ajouter une recette" /> Ajouter
                une recette
              </NavLink>
            </div>
          </div>
          <NavLink className="login_button" to="/connexion">
            <img src={login} width="30px" alt="Connexion" />
            <span>Connexion</span>
          </NavLink>
        </nav>
      </header>

      <div className="mobile_navbar">
        <NavLink to="/">
          <img src={accueil} width="30px" alt="Accueil" />
        </NavLink>
        <NavLink to="/">
          <img src={dernière} width="30px" alt="Dernières recettes" />
        </NavLink>
        <NavLink to="/recettesfavorites">
          <img src={favoris} width="30px" alt="Mes recettes favorites" />
        </NavLink>
        <NavLink to="/">
          <img src={add} width="30px" alt="Ajouter une recette" />
        </NavLink>
      </div>
    </>
  );
}

export default Navbar;

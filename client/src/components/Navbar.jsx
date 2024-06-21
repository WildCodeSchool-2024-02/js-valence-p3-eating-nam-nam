import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import { accueil, add, dernière, login, logo, favoris } from "./import";

function Navbar() {
  const navigate = useNavigate();

  const redirectConnexion = () => {
    navigate("/connexion");
  };

  return (
    <div className="navbar_container">
      <nav className="navbar">
        <div className="search_container">
          <div className="search_bar">
            <input
              type="text"
              name="search_bar"
              id="search_bar"
              placeholder="Rechercher une recette, un ingrédient ..."
            />
          </div>
        </div>
        <div className="login_container">
          <div className="login_button">
            <button type="button" onClick={redirectConnexion}>
              <img src={login} width="30px" alt="Connexion" /> Connexion
            </button>
          </div>
        </div>
        <div className="navbar_logo">
          <img src={logo} alt="logo" width="90px" />
        </div>
        <ul className="nav_button">
          <li>
            <button type="button">
              <img src={accueil} width="30px" alt="Accueil" /> Accueil
            </button>
          </li>
          <li>
            <button type="button">
              <img src={dernière} width="30px" alt="Dernières recettes" />{" "}
              Dernières recettes ajoutées
            </button>
          </li>
          <li>
            <button type="button">
              <img src={favoris} width="30px" alt="Mes recettes favorites" />{" "}
              Mes recettes favorites
            </button>
          </li>
          <li>
            <button type="button">
              <img src={add} width="30px" alt="Ajouter une recette" /> Ajouter
              une recette
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;

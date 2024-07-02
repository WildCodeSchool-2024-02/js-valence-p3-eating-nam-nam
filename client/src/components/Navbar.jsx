import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import { accueil, add, dernière, login, logo, favoris } from "./import";

function Navbar() {
  const navigate = useNavigate();

  const redirectConnexion = () => {
    navigate("/connexion");
  };

  return (
    <nav>
      <header>
        <img className="navbar_logo" src={logo} alt="logo" width="90px" />
      </header>
      <div className="nav_content">
        <input
          type="text"
          name="search_bar"
          id="search_bar"
          placeholder="Rechercher une recette, un ingrédient ..."
        />
        <div className="button_menu">
          <button type="button">
            <img src={accueil} width="30px" alt="Accueil" /> Accueil
          </button>
          <button type="button">
            <img src={dernière} width="30px" alt="Dernières recettes" />{" "}
            Dernières recettes ajoutées
          </button>
          <button type="button">
            <img src={favoris} width="30px" alt="Mes recettes favorites" /> Mes
            recettes favorites
          </button>
          <button type="button">
            <img src={add} width="30px" alt="Ajouter une recette" /> Ajouter une
            recette
          </button>
        </div>
      </div>
      <button
        className="login_button"
        type="button"
        onClick={redirectConnexion}
      >
        <img src={login} width="30px" alt="Connexion" /> Connexion
      </button>
    </nav>
  );
}

export default Navbar;

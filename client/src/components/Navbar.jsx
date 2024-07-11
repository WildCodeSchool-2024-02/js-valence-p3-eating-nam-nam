import { useNavigate, useLocation, NavLink } from "react-router-dom";
import "../styles/Navbar.css";
import { accueil, add, dernière, login, logo, favoris } from "./import";

function Navbar({ setSearchQuery }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    if (location.pathname !== "/recettes") {
      navigate("/recettes");
    }
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <header>
        <img className="navbar_logo" src={logo} alt="logo" />
        <nav className="nav_content">
          <input
            type="text"
            name="search_bar"
            id="search_bar"
            placeholder="Rechercher une recette, un ingrédient ..."
            onChange={handleSearch}
          />
          <div className="button_menu">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : null)}
            >
              <img src={accueil} width="30px" alt="Accueil" /> Accueil
            </NavLink>

            <NavLink
              to="/dernieres-recettes"
              className={({ isActive }) => (isActive ? "active" : null)}
            >
              <img src={dernière} width="30px" alt="Dernières recettes" />
              Dernières recettes ajoutées
            </NavLink>
            <NavLink
              to="/RecettesFavorites"
              className={({ isActive }) => (isActive ? "active" : null)}
            >
              <img src={favoris} width="30px" alt="Mes recettes favorites" />{" "}
              Mes recettes favorites
            </NavLink>
            <NavLink
              to="/RecettesAjoutees"
              className={({ isActive }) => (isActive ? "active" : null)}
            >
              <img src={add} width="30px" alt="Ajouter une recette" /> Ajouter
              une recette
            </NavLink>
          </div>
        </nav>
        <NavLink
          to="/connexion"
          className={({ isActive }) =>
            `login_button ${isActive ? "active" : null}`
          }
        >
          <img src={login} width="30px" alt="Connexion" />
          Connexion
        </NavLink>
      </header>
      <div className="mobile_navbar">
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
          to="RecettesAjoutees"
          className={({ isActive }) => (isActive ? "active" : null)}
        >
          <img src={add} width="30px" alt="Ajouter une recette" />
        </NavLink>
      </div>
    </>
  );
}

export default Navbar;

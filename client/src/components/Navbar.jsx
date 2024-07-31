import { useNavigate, useLocation, NavLink, Link } from "react-router-dom";
import "../styles/Navbar.css";
import {
  accueil,
  add,
  dernière,
  login,
  logo,
  favoris,
  logoutIcon,
  avatar,
} from "./import";
import { logout } from "../api/api";

function Navbar({ setSearchQuery, isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogOut = async () => {
    try {
      await logout();
      setIsLoggedIn(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = (e) => {
    if (location.pathname !== "/recettes") {
      navigate("/recettes");
    }
    setSearchQuery(e.target.value);
  };

  return (
    <header>
      <img className="navbar_logo" src={logo} alt="logo" />
      <nav className="nav_content">
        <input
          className="search_nav"
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
            <img src={favoris} width="30px" alt="Mes recettes favorites" /> Mes
            recettes favorites
          </NavLink>
          <NavLink
            to="/RecettesAjoutees"
            className={({ isActive }) => (isActive ? "active" : null)}
          >
            <img src={add} width="30px" alt="Ajouter une recette" /> Ajouter une
            recette
          </NavLink>
        </div>
      </nav>

      {isLoggedIn ? (
        <Link to="/profile/1">
          <img src={avatar} alt="avatar" className="nav_avatar" />
        </Link>
      ) : null}

      {isLoggedIn ? (
        <Link to="/">
          <button type="button" onClick={handleLogOut} className="login_button">
            <img src={logoutIcon} alt="logout" width="30px" /> Deconnexion
          </button>
        </Link>
      ) : (
        <Link to="/connexion" className="login_button">
          <img src={login} alt="login" width="30px" /> Connexion
        </Link>
      )}
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
          to="/RecettesAjoutees"
          className={({ isActive }) => (isActive ? "active" : null)}
        >
          <img src={add} width="30px" alt="Ajouter une recette" />
        </NavLink>
      </div>
    </header>
  );
}

export default Navbar;

import "../styles/Admin.css";
import { Outlet, Link } from "react-router-dom";

export default function Admin() {
  return (
    <>
      <nav className="MenuAdmin">
        <Link to="/admin/">Gestion Recettes</Link>
        <Link to="/admin/GestionIngredients">Gestion Ingredients</Link>
        <Link to="/admin/GestionUtilisateurs">Gestion Utilisateurs</Link>
      </nav>

      <Outlet />
    </>
  );
}

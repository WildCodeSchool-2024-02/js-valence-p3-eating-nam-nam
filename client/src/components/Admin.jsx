import "../styles/Admin.css";
import { Outlet, Link } from "react-router-dom";

export default function Admin() {
  return (
    <div className="admin">
      <nav className="MenuAdmin">
        <button type="button">
          <Link to="/admin/">Gestion Recettes</Link>
        </button>
        <button type="button">
          <Link to="/admin/GestionUtilisateurs">Gestion Utilisateurs</Link>
        </button>
      </nav>
      <Outlet />
    </div>
  );
}

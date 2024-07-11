import "../styles/Login.css";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="login_page">
      <div className="login_title">
        <div className="se_connecter">Se connecter</div>
        <div className="bienvenue">Bienvenue sur notre site</div>
        <div className="info_login">
          <div className="mail">
            <input
              type="text"
              name="mail"
              id="mail"
              placeholder="Entrez votre adresse mail"
            />
          </div>
          <div className="password">
            <input
              type="text"
              name="password"
              id="password"
              placeholder="Entrez votre mot de passe"
            />
          </div>
          <div className="log_button">
            <button type="button">Se connecter</button>
          </div>
          <p style={{ color: "black" }}>Ou</p>
          <Link to="/inscription">
            <div className="inscription_button">
              <button type="button">S'inscrire</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;

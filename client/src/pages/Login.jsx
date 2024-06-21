import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {
  const redirectInscription = useNavigate();

  const handleClick = () => {
    redirectInscription("/inscription");
  };

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
          <div className="inscription_button">
            <button type="button" onClick={handleClick}>
              S'inscrire
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

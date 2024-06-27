import { useState } from "react";
import "../styles/Inscription.css";

function Inscription() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
    } else {
      setError("");
    }
  };

  return (
    <div className="inscription_page">
      <form onSubmit={handleSubmit}>
        <div className="inscription_title">
          <div className="inscription">S'inscrire</div>
          <div className="rejoindre">
            Rejoignez la communauté Eating Nam Nam
          </div>
          <div className="info_login">
            <div className="mail">
              <input
                type="email"
                name="mail"
                id="mail"
                placeholder="Entrez votre adresse mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="password">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Entrez votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="password">
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirmez votre mot de passe"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <input type="date" />
            {error && <p className="error_message">{error}</p>}
            <div className="inscription_button">
              <button type="submit">S'inscrire</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Inscription;

import "../styles/Inscription.css";

function Inscription() {
  return (
    <div className="inscription_page">
      <div className="inscription_title">
        <div className="inscription">S'inscrire</div>
        <div className="rejoindre">Rejoignez la communautée Eating Nam Nam</div>
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
          <div className="password">
            <input
              type="text"
              name="password"
              id="password"
              placeholder="Confirmez votre mot de passe"
            />
          </div>

          <input type="date" value="2024-01-01" />
          <div className="inscription_button">
            <button type="button">S'inscrire</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inscription;

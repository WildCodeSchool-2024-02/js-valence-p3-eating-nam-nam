import { useLoaderData } from "react-router-dom";
import "../styles/Profile.css";
import anna from "../assets/images/ANNA GUNN.jpg";

export default function Profile() {
  const user = useLoaderData();

  return (
    <div className="profile-container">
      <img src={anna} alt="ANNA" className="profile-image" />
      <h2>MON PROFIL</h2>
      <div className="profile-info">
        <h2>{user.username || "Pseudo"}</h2>
        <p>Inscrite depuis le 22/01/2023</p>
      </div>
      <h2 className="title">MES INFOS PERSO</h2>
      <div className="form-container">
        <h3 className="label-prenom">PRÉNOM:</h3>
        <span className="text-value">{user.name || ""}</span>

        <h3 className="label-profil">NOM:</h3>
        <span className="text-value">{user.last_name || ""}</span>

        <h3 className="label-email">EMAIL:</h3>
        <span className="text-value">{user.email || ""}</span>

        <h3 className="label-profil">MOT DE PASSE:</h3>
        <span className="text-value">******</span>
      </div>
    </div>
  );
}

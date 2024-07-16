import { useLoaderData } from "react-router-dom";
import "../styles/Profile.css";
import anna from "../assets/images/ANNA GUNN.jpg";

export default function Profile() {
  const user = useLoaderData();

  return (
    <div className="profile-container">
      <img src={anna} alt="ANNA" className="profile-image" />
      <h2 className="pseudo">{user.username || "Pseudo"}</h2>
      <h2 className="title">MES INFOS PERSO</h2>
      <div className="form-container">
        <h3 className="label-prenom">Prénom:</h3>
        <span className="text-value">{user.name || ""}</span>

        <h3 className="label-profil">Nom:</h3>
        <span className="text-value">{user.last_name || ""}</span>

        <h3 className="label-email">Email:</h3>
        <span className="text-value">{user.email || ""}</span>

        <h3 className="label-profil">Date de naissance:</h3>
        <span className="text-value">{user.birthdate}</span>
      </div>
    </div>
  );
}

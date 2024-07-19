import { useLoaderData } from "react-router-dom";
import "../styles/Profile.css";
import anna from "../assets/images/ANNA GUNN.jpg";

export default function Profile() {
  const user = useLoaderData();

  return (
    <div className="profil_container">
      <img src={anna} alt="ANNA" className="profil_image" />
      <h2 className="pseudo">{user.username}</h2>
      <h2 className="title">MES INFOS PERSO</h2>
      <div className="info_container">
        <h3 className="info_title">Prénom:</h3>
        <span className="value">{user.name}</span>

        <h3 className="info_title">Nom:</h3>
        <span className="value">{user.last_name}</span>

        <h3 className="info_title">Email:</h3>
        <span className="value">{user.email}</span>

        <h3 className="info_title">Date de naissance:</h3>
        <span className="value">{user.birthdate}</span>
      </div>
    </div>
  );
}

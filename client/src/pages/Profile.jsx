import { useLoaderData } from "react-router-dom";
import "../styles/Profile.css";
import { avatar } from "../components/import";

export default function Profile() {
  const user = useLoaderData();

  return (
    <div className="profil_container">
      <img src={avatar} alt="avatar" className="profil_image" />
      <h2 className="pseudo">{user.username}</h2>
      <h2 className="title">MES INFOS PERSO</h2>
      <div className="info_container">
        <h3 className="info_title">Prénom:</h3>
        <h3 className="value">{user.name}</h3>

        <h3 className="info_title">Nom:</h3>
        <h3 className="value">{user.last_name}</h3>

        <h3 className="info_title">Email:</h3>
        <h3 className="value">{user.email}</h3>

        <h3 className="info_title">Date de naissance:</h3>
        <h3 className="value">{user.birthdate}</h3>
      </div>
    </div>
  );
}

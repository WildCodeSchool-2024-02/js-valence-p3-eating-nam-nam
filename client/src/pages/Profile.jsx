import { useState } from "react";
import "../styles/Profile.css";
import anna from "../assets/images/ANNA GUNN.jpg";

export default function Profile() {
  const [formData, setFormData] = useState({
    pseudonyme: "",
    prenom: "",
    nom: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormData({
      pseudonyme: "",
      prenom: "",
      nom: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="profile-container">
      <img src={anna} alt="ANNA" className="profile-image" />
      <h2>MON PROFIL</h2>
      <div className="profile-info">
        <h2>pseudo</h2>
        <p>Inscrite depuis le 22/01/2023</p>
      </div>
      <h2 className="title">MES INFOS PERSO</h2>
      <div className="form-container">
        <label className="label-profil" htmlFor="pseudonyme">
          PSEUDONYME:
        </label>

        <input
          className="input-profil"
          type="text"
          id="pseudonyme"
          name="pseudonyme"
          value={formData.pseudonyme}
          onChange={handleChange}
          placeholder="Entrez votre pseudonyme"
        />

        <label className="label-prenom" htmlFor="prenom">
          PRÉNOM:
        </label>
        <input
          className="input-profil"
          type="text"
          id="prenom"
          name="prenom"
          value={formData.prenom}
          onChange={handleChange}
          placeholder="Entrez votre prénom"
        />

        <label className="label-profil" htmlFor="nom">
          NOM:
        </label>
        <input
          className="input-profil "
          type="text"
          id="nom"
          name="nom"
          value={formData.nom}
          onChange={handleChange}
          placeholder="Entrez votre nom"
        />

        <label className="label-email" htmlFor="email">
          EMAIL:
        </label>
        <input
          className="input-profil"
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Entrez votre email"
        />

        <label className="label-profil" htmlFor="password">
          MOT DE PASSE:
        </label>
        <input
          className="input-profil"
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Entrez votre mot de passe"
        />
      </div>
      <button className="enregistrer" type="submit" onClick={handleSubmit}>
        Enregistrer
      </button>
    </div>
  );
}
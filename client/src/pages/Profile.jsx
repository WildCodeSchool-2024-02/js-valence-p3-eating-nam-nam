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
    <>
      <div className="profile-container">
        <img src={anna} alt="ANNA" className="profile-image" />
        <h2>MON PROFIL</h2>
        <div className="profile-info">
          <h2>pseudo</h2>
          <p>Inscrite depuis le 22/01/2023</p>
        </div>
      </div>
      <h2 className="title">MES INFOS PERSO</h2>
      <div className="form-container">
        <label htmlFor="pseudonyme">PSEUDONYME:</label>

        <input
          type="text"
          id="pseudonyme"
          name="pseudonyme"
          value={formData.pseudonyme}
          onChange={handleChange}
          placeholder="Entrez votre pseudonyme"
        />

        <label htmlFor="prenom">PRÉNOM:</label>
        <input
          type="text"
          id="prenom"
          name="prenom"
          value={formData.prenom}
          onChange={handleChange}
          placeholder="Entrez votre prénom"
        />

        <label htmlFor="nom">NOM:</label>
        <input
          type="text"
          id="nom"
          name="nom"
          value={formData.nom}
          onChange={handleChange}
          placeholder="Entrez votre nom"
        />

        <label htmlFor="email">EMAIL:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Entrez votre email"
        />

        <label className="flex_aligne" htmlFor="password">
          MOT DE PASSE:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Entrez votre mot de passe"
        />
      </div>

      <button type="submit" onClick={handleSubmit}>
        Enregistrer
      </button>
    </>
  );
}

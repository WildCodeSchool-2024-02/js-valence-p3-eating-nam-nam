import { useState } from "react";
import "../styles/Profile.css";

function Profile() {
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
        <img
          src="/src/assets/images/ANNA GUNN.jpg"
          alt="MonProfil"
          className="profile-image"
        />
        <h2>MON PROFIL</h2>
        <div className="profile-info">
          <h2>Pseudo</h2>
        </div>
      </div>
      <h2 className="title">MES INFOS PERSO</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form3-container">
          <label htmlFor="pseudonyme">PSEUDONYME :</label>
          <input
            type="text"
            id="pseudonyme"
            name="pseudonyme"
            value={formData.pseudonyme}
            onChange={handleChange}
            placeholder="Entrez votre pseudonyme"
          />
          <hr />

          <label htmlFor="prenom">PRENOM :</label>
          <input
            type="text"
            id="prenom"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            placeholder="Entrez votre prénom"
          />
          <hr />
          <label htmlFor="nom">NOM :</label>
          <input
            type="text"
            id="nom"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            placeholder="Entrez votre nom"
          />
          <hr />
        </div>
        <div className="form2-container">
          <label htmlFor="email">EMAIL :</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Entrez votre email"
          />
          <hr />

          <label htmlFor="password">MOT DE PASSE :</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Entrez votre mot de passe"
          />
          <hr />
        </div>
        <button type="submit">Enregistrer</button>
      </form>
    </>
  );
}

export default Profile;

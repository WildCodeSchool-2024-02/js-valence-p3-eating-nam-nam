const utilisateurs = {
  1: { id: 1, pseudo: "Pseudo", prénom: "Prénom", nom: "Nom" },
};

const getUserById = (req, res) => {
  const userId = req.params.id;
  const utilisateur = utilisateurs[userId];

  if (utilisateur) {
    res.json(utilisateur);
  } else {
    res.status(404).send("Utilisateur introuvable");
  }
};

module.exports = {
  getUserById,
};

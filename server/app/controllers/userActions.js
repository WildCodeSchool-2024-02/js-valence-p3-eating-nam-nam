const users = {
  1: { id: 1, pseudo: "Pseudo", prénom: "Prénom", nom: "Nom" },
};

const read = (req, res) => {
  const userId = req.params.id;
  const user = users[userId];

  if (user) {
    res.json(user);
  } else {
    res.status(404).send("Utilisateur introuvable");
  }
};

module.exports = {
  read,
};

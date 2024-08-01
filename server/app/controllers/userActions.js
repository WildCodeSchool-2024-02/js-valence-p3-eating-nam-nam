const tables = require("../../database/tables");

const getUsers = async (req, res) => {
  try {
    const users = await tables.user.getUsers();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await tables.user.getUserById(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
const destroy = async (req, res, next) => {
  try {
    const result = await tables.user.delete(req.params.id);

    if (result.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.json({ message: "Utilisateur supprimé" });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUsers,
  getUserById,
  destroy,
};

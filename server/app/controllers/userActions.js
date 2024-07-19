const UserRepository = require("../../database/models/UserRepository");

const getUsers = async (req, res) => {
  try {
    const users = await UserRepository.getUsers();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserRepository.getUserById(userId);
    if (user.length > 0) {
      res.json(user[0]);
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getUsers,
  getUserById,
};

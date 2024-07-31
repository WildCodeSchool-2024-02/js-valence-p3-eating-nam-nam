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

const addUser = async (req, res) => {
  const user = req.body;

  if (typeof user !== "object" || user === null) {
    console.error("req.body is not a valid object:", user);
    return res.sendStatus(400);
  }

  console.info("User object to insert:", user);

  try {
    const result = await tables.user.insert(user);
    if (result && typeof result.insertId !== "undefined") {
      return res.sendStatus(201);
    }
    console.error("Insert result does not contain insertId:", result);
    return res.sendStatus(500);
  } catch (err) {
    console.error("Error during insert:", err);
    return res.sendStatus(500);
  }
};

module.exports = {
  getUsers,
  getUserById,
  addUser,
};

const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const dayjs = require("dayjs");

const tables = require("../../database/tables");

const login = async (req, res) => {
  const userLogin = req.user;

  if (!userLogin) {
    return res.sendStatus(400);
  }

  const verified = await argon2.verify(
    userLogin.hashed_password,
    req.body.password
  );
  if (!verified) {
    return res.sendStatus(422);
  }

  delete userLogin.hashed_password;
  const token = jwt.sign({ sub: userLogin.id }, process.env.APP_SECRET, {
    expiresIn: "1h",
  });

  res.cookie("auth_token", token, {
    secure: process.env.NODE_ENV !== "development",
    httpOnly: true,
    expires: dayjs().add(30, "days").toDate(),
  });

  return res.json({ userLogin });
};

const add = async (req, res) => {
  const user = req.body;

  if (typeof user !== "object" || user === null) {
    console.error("req.body is not a valid object:", user);
    return res.sendStatus(400);
  }

  console.info("User object to insert:", user);

  try {
    const result = await tables.user.insert(user);
    if (result && typeof result.insertId !== "undefined") {
      return res.location(`/users/${result.insertId}`).sendStatus(201);
    }
    console.error("Insert result does not contain insertId:", result);
    return res.sendStatus(500);
  } catch (err) {
    console.error("Error during insert:", err);
    return res.sendStatus(500);
  }
};

module.exports = { login, add };

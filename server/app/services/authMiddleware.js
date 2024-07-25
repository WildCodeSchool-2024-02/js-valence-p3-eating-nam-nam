const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const tables = require("../../database/tables");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

// eslint-disable-next-line consistent-return
const getUserByEmail = async (req, res, next) => {
  try {
    const user = await tables.user.readWithPassword(req.body.email);

    if (!user) {
      return res.sendStatus(422);
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies?.auth_token;
    req.auth = jwt.verify(token, process.env.APP_SECRET);

    next();
  } catch (err) {
    console.error(err);

    res.sendStatus(401);
  }
};

const hashPassword = async (req, res, next) => {
  try {
    const hashedPassword = await argon2.hash(req.body.password, hashingOptions);
    req.body.hashedPassword = hashedPassword;

    delete req.body.password;

    next();
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

module.exports = { hashingOptions, getUserByEmail, verifyToken, hashPassword };

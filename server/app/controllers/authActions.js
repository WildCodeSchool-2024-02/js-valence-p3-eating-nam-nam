const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const dayjs = require("dayjs");

const login = async (req, res) => {
  const userLogin = req.user;
  const verified = await argon2.verify(
    userLogin.hashed_password,
    req.body.password
  );
  if (!verified) {
    return res.sendStatus(422);
  }

  delete userLogin.hashed_password;
  const token = jwt.sign({ sub: userLogin.id }, process.env.APP_SECRET, {
    expiresIn: "1y",
  });

  res.cookie("auth_token", token, {
    secure: process.env.NODE_ENV !== "development",
    httpOnly: true,
    expires: dayjs().add(30, "days").toDate(),
  });

  return res.json({ userLogin });
};

const loginSuccess = (req, res) => res.sendStatus(200);

const logout = (req, res) => res.clearCookie("auth_token").sendStatus(200);

module.exports = { login, loginSuccess, logout };

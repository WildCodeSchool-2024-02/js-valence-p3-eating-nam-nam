const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

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

  return res.json({ userLogin, token });
};

module.exports = { login };

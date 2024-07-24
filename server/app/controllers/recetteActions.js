const tables = require("../../database/tables");

const read = async (req, res, next) => {
  try {
    const recette = await tables.recette.read(req.params.id);

    if (recette == null) {
      res.sendStatus(404);
    } else {
      res.json(recette);
    }
  } catch (err) {
    next(err);
  }
};
const browse = async (req, res, next) => {
  try {
    const recette = await tables.recette.readAll();

    if (recette == null) {
      res.sendStatus(404);
    } else {
      res.json(recette);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  read,
  browse,
};

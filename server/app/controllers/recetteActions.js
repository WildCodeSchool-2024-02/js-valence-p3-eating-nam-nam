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
const confirm = async (req, res, next) => {
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

const destroy = async (req, res, next) => {
  try {
    const result = await tables.recette.delete(req.params.id);

    if (result.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.json({ message: "Recette supprimée" });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  read,
  browse,
  confirm,
  destroy,
};

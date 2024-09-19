const tables = require("../../database/tables");

const read = async (req, res) => {
  const recette = await tables.recette.read(req.params.id);
  if (recette == null) {
    res.sendStatus(404);
  } else {
    res.json(recette);
  }
};

const add = async (req, res, next) => {
  try {
    const {
      title,
      serving,
      nutritional_values: nutritionalValues,
      picture,
      ...rest
    } = req.body;

    // filtrer les clés qui commencent par ingredients

    const ingredients = Object.entries(rest)
      .filter(([key]) => key.includes("ingredients"))
      .map(([, value]) => value);

    const steps = Object.entries(rest)
      .filter(([key]) => key.includes("steps"))
      .map(([, value]) => value);

    // FIXME: Récupérer l'id de l'utilisateur connecté
    // via req.auth.sub
    const userId = 1;

    // Validate inputs
    if (
      !title ||
      !userId ||
      !picture ||
      !serving ||
      !nutritionalValues ||
      !Array.isArray(steps) ||
      !Array.isArray(ingredients)
    ) {
      return res.status(400).json({
        error: "Il est nécessaire de remplir correctement tous les champs.",
      });
    }

    const recetteId = await tables.recette.create(
      { title, userId, picture, serving, nutritionalValues },
      steps,
      ingredients
    );

    return res.status(201).json({ recetteId });
  } catch (error) {
    res.status(500).json({ error });
    next(error);
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
    const recette = await tables.recette.publish(req.params.id);

    if (recette == null) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
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
  add,
};

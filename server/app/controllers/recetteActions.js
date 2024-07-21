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
      user_id: userId,
      image,
      serving,
      nutritional_values: nutritionalValues,
      published,
      steps,
      ingredients,
    } = req.body;

    // Validate inputs
    if (
      !title ||
      !userId ||
      !image ||
      !serving ||
      !nutritionalValues ||
      !Array.isArray(steps) ||
      !Array.isArray(ingredients)
    ) {
      return res.status(400).json({
        error: "All fields are required and steps/ingredients must be arrays",
      });
    }

    const recetteId = await tables.recette.create(
      { title, userId, image, serving, nutritionalValues, published },
      steps,
      ingredients
    );

    return res.status(201).json({ recetteId });
  } catch (error) {
    res.status(500).json({ error });
    next(error);
  }
};

module.exports = {
  read,
  add,
};

const tables = require("../../database/tables");

const read = async (req, res) => {
  const recette = await tables.recette.read(req.params.id);
  if (recette == null) {
    res.sendStatus(404);
  } else {
    res.json(recette);
  }
};

const add = async (req, res) => {
  // add the recipe to the database
  const result = await tables.recette.create(req.body);

  if (result.affectedRows === 0) {
    res.status(500).json({ message: "Could not create recipe" });
    return;
  }

  res.status(201).json({
    result,
  });
};

module.exports = {
  read,
  add,
};

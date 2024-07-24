const tables = require("../../database/tables");

const read = async (req, res, next) => {
  try {
    const step = await tables.step.read(req.params.id);

    if (step == null) {
      res.sendStatus(404);
    } else {
      res.json(step);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  read,
};

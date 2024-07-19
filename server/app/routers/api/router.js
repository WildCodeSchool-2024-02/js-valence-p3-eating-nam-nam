const express = require("express");

const router = express.Router();

const recetteController = require("../../controllers/recetteActions");

router.get("/recettes/:id", recetteController.read);
router.post("/recettes", recetteController.add);

module.exports = router;

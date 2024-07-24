const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */
const stepsActions = require("../../controllers/stepsActions");

router.get("/steps/:id", stepsActions.read);

const recetteController = require("../../controllers/recetteActions");

router.get("/recettes/:id", recetteController.read);
/* ************************************************************************* */

module.exports = router;

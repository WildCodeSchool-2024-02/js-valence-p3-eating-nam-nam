const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const recetteController = require("../../controllers/recetteActions");

router.get("/recettes/:id", recetteController.read);
/* ************************************************************************* */

module.exports = router;

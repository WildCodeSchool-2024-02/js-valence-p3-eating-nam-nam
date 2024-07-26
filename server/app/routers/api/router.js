const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const recetteController = require("../../controllers/recetteActions");

router.get("/recettes/:id", recetteController.read);
router.get("/recettes", recetteController.browse);
router.patch("/recettes/:id", recetteController.confirm);
router.delete("/recettes/:id", recetteController.destroy);

/* ************************************************************************* */
const { getUsers, getUserById } = require("../../controllers/userActions");

router.get("/users", getUsers);
router.get("/users/:id", getUserById);

/* ************************************************************************* */

module.exports = router;

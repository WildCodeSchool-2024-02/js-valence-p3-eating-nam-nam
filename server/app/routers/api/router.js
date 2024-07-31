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
const userController = require("../../controllers/userActions");

router.get("/users", userController.getUsers);
router.get("/users/:id", userController.getUserById);
router.delete("/users/:id", userController.destroy);

/* ************************************************************************* */

module.exports = router;

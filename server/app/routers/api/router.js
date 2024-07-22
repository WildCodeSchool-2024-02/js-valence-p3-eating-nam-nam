const express = require("express");

const router = express.Router();

const recetteController = require("../../controllers/recetteActions");

router.get("/recettes/:id", recetteController.read);

/* ************************************************************************* */
const { getUsers, getUserById } = require("../../controllers/userActions");

router.get("/users", getUsers);
router.get("/users/:id", getUserById);

router.post("/recettes", recetteController.add);

module.exports = router;

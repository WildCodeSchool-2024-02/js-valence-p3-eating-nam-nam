const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const recetteController = require("../../controllers/recetteActions");

router.get("/recettes/:id", recetteController.read);

/* ************************************************************************* */
const { getUsers, getUserById } = require("../../controllers/userActions");

router.get("/users", getUsers);
router.get("/users/:id", getUserById);

/* ************************************************************************* */

const authController = require("../../controllers/authActions");
const { getUserByEmail } = require("../../services/authMiddleware");

router.post("/login", getUserByEmail, authController.login);

/* ************************************************************************* */

module.exports = router;

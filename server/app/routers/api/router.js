const express = require("express");

const router = express.Router();

// **********************************************************************//

const recetteController = require("../../controllers/recetteActions");

router.get("/recettes/:id", recetteController.read);
router.post("/recettes", recetteController.add);
router.post("/recettes", recetteController.add);

// **********************************************************************//

const { getUserById, getUsers } = require("../../controllers/userActions");

router.get("/users", getUsers);
router.get("/users/:id", getUserById);

// **********************************************************************//

const authController = require("../../controllers/authActions");
const {
  getUserByEmail,
  hashPassword,
} = require("../../services/authMiddleware");

router.post("/login", getUserByEmail, authController.login);
router.post("/users", hashPassword, authController.add);

module.exports = router;

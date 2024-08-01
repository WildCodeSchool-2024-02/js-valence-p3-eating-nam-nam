const express = require("express");

const router = express.Router();

// **********************************************************************//

const recetteController = require("../../controllers/recetteActions");

router.get("/recettes/:id", recetteController.read);
router.post("/recettes", recetteController.add);
router.get("/recettes", recetteController.browse);
router.patch("/recettes/:id", recetteController.confirm);
router.delete("/recettes/:id", recetteController.destroy);

/* ************************************************************************* */
const userController = require("../../controllers/userActions");

// **********************************************************************//

router.get("/users", userController.getUsers);
router.get("/users/:id", userController.getUserById);
router.delete("/users/:id", userController.destroy);

// **********************************************************************//

const authController = require("../../controllers/authActions");
const {
  getUserByEmail,
  hashPassword,
} = require("../../services/authMiddleware");

router.post("/login", getUserByEmail, authController.login);
router.post("/users", hashPassword, authController.add);

module.exports = router;

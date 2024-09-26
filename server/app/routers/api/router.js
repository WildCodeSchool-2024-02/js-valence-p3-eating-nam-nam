const express = require("express");
const recetteController = require("../../controllers/recetteActions");
const authController = require("../../controllers/authActions");
const userController = require("../../controllers/userActions");
const {
  getUserByEmail,
  hashPassword,
  verifyToken,
} = require("../../services/authMiddleware");

const router = express.Router();
// Routes pour les recettes
router.get("/recettes/:id", recetteController.read);
router.post("/recettes", recetteController.add);
// Routes pour les utilisateurs
router.get("/users", userController.getUsers);
router.get("/users/:id", userController.getUserById);
// Routes pour l'authentification
router.post("/login", getUserByEmail, authController.login);
router.post("/users", hashPassword, userController.addUser);
router.get("/logout", verifyToken, authController.logout);
router.get("/verify-auth", verifyToken, authController.loginSuccess);
// Route admin
router.use(verifyToken);
router.get("/users", userController.getUsers);
router.get("/users/:id", userController.getUserById);
router.delete("/users/:id", userController.destroy);
router.get("/recettes", recetteController.browse);
router.patch("/recettes/:id", recetteController.confirm);
router.delete("/recettes/:id", recetteController.destroy);
module.exports = router;

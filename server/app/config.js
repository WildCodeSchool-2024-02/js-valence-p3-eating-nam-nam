const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
// Middleware pour les cookies
app.use(cookieParser(process.env.COOKIE_SECRET));
// Configuration du CORS
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL, // Assurez-vous que cette valeur est définie dans `server/.env`
  })
);
// Middleware pour le parsing JSON
app.use(express.json());
// Importation du routeur d'API
const apiRouter = require("./routers/api/router");
// Utilisation du routeur d'API
app.use("/api", apiRouter);
// Chemins vers les répertoires de build React et les ressources publiques
const reactBuildPath = path.join(__dirname, "/../../client/build");
const publicFolderPath = path.join(__dirname, "/../public");
// Servir les fichiers statiques de React
app.use(express.static(reactBuildPath));
// Servir les ressources du serveur
app.use(
  "/assets",
  express.static(path.join(publicFolderPath, "assets"), { maxAge: "1y" })
);
// Rediriger les requêtes non gérées vers le fichier index de React
app.get("*", (_, res) => {
  res.sendFile(path.join(reactBuildPath, "index.html"));
});
// Middleware de gestion des erreurs (doit être défini en dernier)
const logErrors = (err, req, res, next) => {
  console.error(err);
  console.error("Requête en erreur :", req.method, req.path);
  next(err);
};
app.use(logErrors);
module.exports = app;

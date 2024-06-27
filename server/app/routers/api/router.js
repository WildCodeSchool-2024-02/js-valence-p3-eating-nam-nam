const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const userController = require("../../controllers/userActions");

router.get("/users/:id", userController.read);

/* ************************************************************************* */

module.exports = router;

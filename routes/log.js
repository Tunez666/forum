const express = require("express");
const router = express.Router();
const indexController = require("../controllers/authController");

console.log("login routes loaded");

router.post("/login", indexController.login);

module.exports = router;
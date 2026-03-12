const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");

console.log("index routes loaded");

// Главная
router.get("/", indexController.showHome);

module.exports = router;
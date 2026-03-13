const express = require("express");
const router = express.Router();
const indexController = require("../controllers/authController");

console.log("auth routes loaded");

router.post("/reg", indexController.register);

module.exports = router;
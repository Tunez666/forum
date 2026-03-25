const express = require("express");
const router = express.Router();
const regController = require("../controllers/authController");
const logoutController = require("../controllers/authController");

console.log("auth routes loaded");

router.post("/reg", regController.register);

router.get("/logout", logoutController.logout);

module.exports = router;
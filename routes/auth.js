const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const logoutController = require("../controllers/authController");

console.log("auth routes loaded");

router.get("/login", authController.showLogin);

router.get("/reg", authController.showReg);

router.post("/reg", authController.register);

router.post("/login", authController.login);

router.get("/logout", logoutController.logout);

module.exports = router;
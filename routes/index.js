const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");
const authMiddleware = require("../middlewares/auth");

console.log("index routes loaded");

// Главная
router.get("/", indexController.showHome);

// Вход
router.get("/login", indexController.showLogin);

// Регистрация
router.get("/reg", indexController.showReg);

// Админка
router.get("/adminPanel", authMiddleware.isAuth, authMiddleware.isAdmin, indexController.showAdmin);

module.exports = router;
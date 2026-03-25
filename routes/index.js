const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");

console.log("index routes loaded");

// Главная
router.get("/", indexController.showHome);

// Вход
router.get("/login", indexController.showLogin);

// Регистрация
router.get("/reg", indexController.showReg);

//Админ панель
router.get("/adminPanel", indexController.showAdmin);

module.exports = router;
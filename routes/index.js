const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");

console.log("index routes loaded");

// Главная
router.get("/", indexController.showHome);

//Форум
router.get("/forum", indexController.showForum);

//Категории
router.get("/topics", indexController.showTop);

//дочерние категории
router.get("/dagCategories/:id", indexController.showCategory);

router.post("/modalCreateTopic", indexController.createTopic);

module.exports = router;
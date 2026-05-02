const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");
const likesController = require("../controllers/likesController");
const authMiddleware = require("../middlewares/auth");

console.log("index routes loaded");

// Главная
router.get("/", indexController.showHome);

//Форум
//router.get("/forum", indexController.showForum);

//Категории
router.get("/topics", indexController.showTop);

//дочерние категории
router.get("/dagTopics/:id", indexController.showDagTopics);

//посты 
router.get("/topic/:id", indexController.showPosts);

//Модалка создания топика
router.post("/modalCreateTopic", indexController.createTopic);

//Отправка соо
router.post("/reply/:id", authMiddleware.isAuth, indexController.createMess);

//like
router.post("/like", likesController.toggleLike);

module.exports = router;
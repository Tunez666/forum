const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");
const likesController = require("../controllers/likesController");
const searchController = require("../controllers/searchController");
const authMiddleware = require("../middlewares/auth");

console.log("index routes loaded");

// Главная
router.get("/", indexController.showHome);

//Правила
router.get("/rules", indexController.showRules);

//Политика
router.get("/privacy", indexController.showPolitic);

//Категории
router.get("/topics", indexController.showTop);

//дочерние категории
router.get("/dagTopics/:id", indexController.showDagTopics);

//посты 
router.get("/topic/:id", indexController.showPosts);

//Модалка создания топика
router.post("/modalCreateTopic", authMiddleware.isAuth, indexController.createTopic);

//Отправка соо
router.post("/reply/:id", authMiddleware.isAuth, indexController.createMess);

//like
router.post("/like", authMiddleware.isAuth, likesController.toggleLike);

//searchRes
router.get("/searchResults", searchController.showSearch); 

//secret
router.get("/errors/secret", (req, res) => {
    res.render("errors/secret");
});

//Модалка жалобы
router.post("/report/:id", authMiddleware.isAuth, indexController.createReport);

module.exports = router;
const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");
const likesController = require("../controllers/likesController");
const dislikesController = require("../controllers/dislikesController");
const searchController = require("../controllers/searchController");
const authMiddleware = require("../middlewares/auth");
const upload = require("../middlewares/uploadMess");

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
router.get("/dagCat/:id", indexController.showDagCat);

//дочерние топики
router.get("/dagTopics/:id", indexController.showDagTopics);

//категории
router.get("/cat", indexController.showCategories);

//посты 
router.get("/topic/:id", indexController.showPosts);

//Контакты
router.get("/contact", indexController.showContact);

//факью
router.get("/faq", indexController.showfaq);

//terms
router.get("/terms", indexController.showTerms);

//about
router.get("/about", indexController.showAbout);

//Отпарвка формы связи
router.post("/contact/send", indexController.contactSend);

//Модалка создания топика
router.post("/modalCreateTopic", authMiddleware.isAuth, indexController.createTopic);

//Отправка соо
router.post("/reply/:id", authMiddleware.isAuth,  upload.single("ava"), indexController.createMess);

//Редактирование соо
router.post("/edit/:id", authMiddleware.isAuth, indexController.editPost);

//Удаление поста
router.post("/delete/:id", authMiddleware.isAuth, indexController.delPost);

//like
router.post("/like", authMiddleware.isAuth, likesController.toggleLike);

//dislike
router.post("/dislike", authMiddleware.isAuth, dislikesController.toggleDislike);

//searchRes
router.get("/searchResults", searchController.showSearch); 

//secret
router.get("/errors/secret", (req, res) => {
    res.render("errors/secret");
});

//Модалка жалобы на пост
router.post("/report/:id", authMiddleware.isAuth, indexController.createReport);

//Модалка жалобы на топик
router.post("/repTop", authMiddleware.isAuth, indexController.createTopRep);

//Модалка ред топика
router.post("/modalEditTopic/:id", authMiddleware.isAuth, indexController.editTopic);

//Модалка закрытия топика
//router.post("/close/:id", authMiddleware.isAuth, indexController.closeTopic);
module.exports = router;
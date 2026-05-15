const express = require("express");
const router = express.Router();
const userConroller = require("../controllers/userConroller");
const authMiddleware = require("../middlewares/auth");
const upload = require("../middlewares/uploadAva");

console.log("user routes loaded");

router.get("/lk", authMiddleware.isAuth, authMiddleware.isUser, userConroller.showUser);

router.get("/prLk/:id", userConroller.showLkUser);

router.get("/userPosts", authMiddleware.isAuth, authMiddleware.isUser, userConroller.showPosts);

router.get("/userTopics", authMiddleware.isAuth, authMiddleware.isUser, userConroller.showTopics);

router.post("/updateUserInfo", upload.single("ava"), userConroller.updateUserInfo);

router.post("/updatePass", authMiddleware.isAuth, authMiddleware.isUser, userConroller.updatePass);

router.post("/modalDeleteAcc", authMiddleware.isAuth, authMiddleware.isUser, userConroller.deleteUserModal);

//Удаление поста
router.post("/delete", authMiddleware.isAuth, authMiddleware.isUser, userConroller.dropPost);

module.exports = router;
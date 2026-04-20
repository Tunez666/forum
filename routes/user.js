const express = require("express");
const router = express.Router();
const userConroller = require("../controllers/userConroller");
const authMiddleware = require("../middlewares/auth");
const upload = require("../middlewares/uploadAva");

console.log("user routes loaded");

router.get("/lk", authMiddleware.isAuth, authMiddleware.isUser, userConroller.showUser);

router.post("/updateUserInfo", upload.single("ava"), userConroller.updateUserInfo);

router.post("/updatePass", authMiddleware.isAuth, authMiddleware.isUser, userConroller.updatePass);

router.post("/modalDeleteAcc", authMiddleware.isAuth, authMiddleware.isUser, userConroller.deleteUserModal);

module.exports = router;
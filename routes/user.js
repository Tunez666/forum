const express = require("express");
const router = express.Router();
const userConroller = require("../controllers/userConroller");
const authMiddleware = require("../middlewares/auth");
const upload = require("../middlewares/uploadAva");

console.log("user routes loaded");

router.get("/lk", authMiddleware.isAuth, authMiddleware.isUser, userConroller.showUser);

router.post("/updateUserInfo", upload.single("ava"), userConroller.updateUserInfo);

//router.post("/updateAva", upload.single("ava"), userConroller.updateAva);

module.exports = router;
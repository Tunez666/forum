const express = require("express");
const router = express.Router();
const adminConroller = require("../controllers/adminConroller");
const authMiddleware = require("../middlewares/auth");

console.log("admin routes loaded");

router.get("/dashboard", authMiddleware.isAuth, authMiddleware.isAdmin, adminConroller.showAdmin);

router.get("/content", authMiddleware.isAuth, authMiddleware.isAdmin, adminConroller.showContent);

module.exports = router;
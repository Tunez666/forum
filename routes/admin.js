const express = require("express");
const router = express.Router();
const adminConroller = require("../controllers/adminConroller");
const authMiddleware = require("../middlewares/auth");
const upload = require("../middlewares/upload");

console.log("admin routes loaded");

router.get("/dashboard", authMiddleware.isAuth, authMiddleware.isAdmin, adminConroller.showAdmin);

router.get("/content", authMiddleware.isAuth, authMiddleware.isAdmin, adminConroller.showContent);

router.get("/categories", authMiddleware.isAuth, authMiddleware.isAdmin, adminConroller.showCategories);

router.get("/topics", authMiddleware.isAuth, authMiddleware.isAdmin, adminConroller.showTopics);

router.get("/settings", authMiddleware.isAuth, authMiddleware.isAdmin, adminConroller.showSett);

router.post("/updateVersion", adminConroller.updateVersion);

router.post(
  "/updateCharacter",
  upload.single("character_image"),
  adminConroller.updateCharacter
);

router.post("/modalAddEvent", adminConroller.addEvent);

router.post("/modalEditEvent", adminConroller.updateEvent);

router.post("/modalDeleteEvent", adminConroller.DeleteEvent);

router.post("/modalAddCategories", adminConroller.addCate);

router.post("/modalEditCategories", adminConroller.updateCate);

router.post("/modalDeleteCategory", adminConroller.deleteCat);

router.post("/updateInfo", upload.single("ava"), adminConroller.updateUserInfo);

router.post("/updatePasss", authMiddleware.isAuth, authMiddleware.isAdmin, adminConroller.updatePass);

router.post("/modalDelete", authMiddleware.isAuth, authMiddleware.isAdmin, adminConroller.deleteUserModal);

module.exports = router;
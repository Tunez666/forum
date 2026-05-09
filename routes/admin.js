const express = require("express");
const router = express.Router();
const adminConroller = require("../controllers/adminConroller");
const authMiddleware = require("../middlewares/auth");
const upload = require("../middlewares/upload");

console.log("admin routes loaded");

router.get("/dashboard", authMiddleware.isAuth, authMiddleware.isAdmin, adminConroller.showAdmin);

router.get("/content", authMiddleware.isAuth, authMiddleware.isAdmin, adminConroller.showContent);

router.get("/categories", authMiddleware.isAuth, authMiddleware.isAdmin, adminConroller.showCategories);

//router.get("/topics", authMiddleware.isAuth, authMiddleware.isAdmin, adminConroller.showTopics);

router.get("/settings", authMiddleware.isAuth, authMiddleware.isAdmin, adminConroller.showSett);

router.get("/reports", authMiddleware.isAuth, authMiddleware.isAdmin, adminConroller.showRep);

router.get("/users", authMiddleware.isAuth, authMiddleware.isAdmin, adminConroller.showUsers);

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

router.post("/updateInfo", upload.single("ava"), authMiddleware.isAuth, authMiddleware.isAdmin, adminConroller.updateUserInfo);

router.post("/updatePasss", authMiddleware.isAuth, authMiddleware.isAdmin, adminConroller.updatePass);

router.post("/modalDelete", authMiddleware.isAuth, authMiddleware.isAdmin, adminConroller.deleteUserModal);

router.post("/deletePost", authMiddleware.isAuth, authMiddleware.isAdmin, adminConroller.deletePosts);

router.post("/deleteTopic", authMiddleware.isAuth, authMiddleware.isAdmin, adminConroller.deleteTop);

router.post("/blockUser", authMiddleware.isAuth, authMiddleware.isAdmin, adminConroller.blockUser);

router.post("/blockUserByTop", authMiddleware.isAuth, authMiddleware.isAdmin, adminConroller.blockUserByTop);

router.post("/good", authMiddleware.isAuth, authMiddleware.isAdmin, adminConroller.allGood);

router.post("/createModer", authMiddleware.isAuth, authMiddleware.isAdmin, adminConroller.createModerator);
router.post("/createAdmin", authMiddleware.isAuth, authMiddleware.isAdmin, adminConroller.createAdm);
router.post("/nowUser", authMiddleware.isAuth, authMiddleware.isAdmin, adminConroller.withoutRules);
router.post("/block", authMiddleware.isAuth, authMiddleware.isAdmin, adminConroller.block);
router.post("/unblock", authMiddleware.isAuth, authMiddleware.isAdmin, adminConroller.unblock);

module.exports = router;
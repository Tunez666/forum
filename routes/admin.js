const express = require("express");
const router = express.Router();
const adminConroller = require("../controllers/adminConroller");
const authMiddleware = require("../middlewares/auth");
const upload = require("../middlewares/upload");

console.log("admin routes loaded");

router.get("/dashboard", authMiddleware.isAuth, authMiddleware.isAdmin, adminConroller.showAdmin);

router.get("/content", authMiddleware.isAuth, adminConroller.showContent);

router.get("/categories", authMiddleware.isAuth, authMiddleware.isAdmin, adminConroller.showCategories);

//router.get("/topics", authMiddleware.isAuth, authMiddleware.isAdmin, adminConroller.showTopics);

router.get("/settings", authMiddleware.isAuth, adminConroller.showSett);

router.get("/reports", authMiddleware.isAuth, adminConroller.showRep);

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

router.post("/updateInfo", upload.single("ava"), adminConroller.updateUserInfo);

router.post("/updatePasss", adminConroller.updatePass);

router.post("/modalDelete", adminConroller.deleteUserModal);

router.post("/deletePost", adminConroller.deletePosts);

router.post("/deleteTopic", adminConroller.deleteTop);

router.post("/blockUser", adminConroller.blockUser);

router.post("/blockUserByTop", adminConroller.blockUserByTop);

router.post("/good", adminConroller.allGood);

router.post("/createModer", adminConroller.createModerator);
router.post("/createAdmin", adminConroller.createAdm);
router.post("/nowUser", adminConroller.withoutRules);
router.post("/block", adminConroller.block);
router.post("/unblock", adminConroller.unblock);

module.exports = router;
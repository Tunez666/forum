const express = require("express");
const router = express.Router();
const adminConroller = require("../controllers/adminConroller");
const authMiddleware = require("../middlewares/auth");
const upload = require("../middlewares/upload");

console.log("admin routes loaded");

router.get("/dashboard", authMiddleware.isAuth, authMiddleware.isAdmin, adminConroller.showAdmin);

router.get("/content", authMiddleware.isAuth, authMiddleware.isAdmin, adminConroller.showContent);

router.post("/updateVersion", adminConroller.updateVersion);

router.post(
  "/updateCharacter",
  upload.single("character_image"), 
  adminConroller.updateCharacter
);

router.post("/modalAddEvent", adminConroller.addEvent);

router.post("/modalEditEvent", adminConroller.updateEvent);

router.post("/modalDeleteEvent", adminConroller.DeleteEvent);

module.exports = router;
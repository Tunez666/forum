const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController"); // путь должен быть верным!

router.get("/", indexController.showHome);

module.exports = router;
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const controller = require("../controller/auth");

router.post("/join", controller.join);

router.post("/login", controller.login);

router.post("/check_dup", controller.checkDup);

module.exports = router;
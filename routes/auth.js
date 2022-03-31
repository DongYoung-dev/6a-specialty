const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const controller = require("../controller/auth");

router.post("/join", controller.join);

router.post("/login", controller.login);

router.get("/users/me", authMiddleware, controller.userMe)

module.exports = router;
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const controller = require("../controller/comment");

router.get("/post/:postId/comment", controller.showComment);

router.post("/post/:postId/comment", authMiddleware, controller.applyComment);

router.patch("/post/:postId/comment/", authMiddleware, controller.updateComment);

router.delete("/post/:postId/comment", authMiddleware, controller.deleteComment);

module.exports = router;
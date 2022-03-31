const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const controller = require("../controller/comment");

// router.get("/post/:postId/comment", controller.showComment);

// router.post("/post/:postId/comment", controller, postsCtl.applyComment);

// router.patch("/post/:postId/comment/:commentId", authMiddleware, controller.updateComment);

// router.delete("/post/:postId/comment/:commentId", authMiddleware, controller.deleteComment);

module.exports = router;
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const controller = require("../controller/post");

router.post("/post", controller.applyPost);

router.get("/post", controller.showPost);

router.get("/post/:postId", controller.detailPost);

router.patch("/post/:postId", controller.updatePost);

router.delete("/post/:postId", controller.deletePost);

// router.patch("/post/:postId/likes", authMiddleware, controller.likesPost);

module.exports = router;
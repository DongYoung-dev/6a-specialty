const express = require("express");
const Post = require("../schemas/post");
const router = express.Router();

// 게시글 등록
router.post("/post", async (req, res) => {
    const { postId, title, name, password, contents, dates } = req.body;

    const post = await Post.find({ postId });
    if (post.length) {
        return res.status(400).json({ success: false, errorMessage: "이미 있는 데이터입니다." });
    }

    const createdPost = await Post.create({ postId, title, name, password, contents, dates });

    res.json({ post: createdPost });
});

// 전체게시글 조회
router.get("/post", async (req, res, next) => {
	const post = await Post.find();
    res.json({ post });
});

// 상세게시글 조회
router.get("/post/:postId", async (req, res) => {
	const { postId } = req.params;
	const post = await Post.findOne({ postId });
    res.json({ post });
});

// 게시글 수정
router.put("/posts/:postId", async (req, res) => {
    const { postId } = req.params;
    const { title, name, password, contents, dates } = req.body;

    const existsPost = await Post.find({ postId: Number(postId) });
    if (existsPost.length) {
        await Post.updateOne({ postsId: Number(postId) }, { $set: { title, name, password, contents, dates } });
    }

    res.json({ success: true });
})

// 게시글 삭제
router.delete("/post/:postId", async (req, res) => {
    const { postId } = req.params;

    const existsPost = await Post.find({ postId });
    if (existsPost.length > 0) {
        await Post.deleteOne({ postId });
    }

    res.json({ success: true });
});

module.exports = router;
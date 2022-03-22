const express = require('express');
const ejs = require('ejs');
const connect = require("./schemas");
const Post = require("./schemas/post");
const app = express();
const port = 3000;

connect();

const postRouter = require("./routes/post");

const requestMiddleware = (req, res, next) => {
    console.log('Request URL:', req.originalUrl, ' - ', new Date());
    next();
};

app.use(express.json());
app.use(express.urlencoded());
app.use(requestMiddleware);

app.use("/api", [postRouter]);

// 작성페이지 불러오기
app.get("/post", (req, res) => {
    res.render("post.ejs")
});

// 메인페이지 불러오기
app.get('/', (req, res) => {
    res.render("index.ejs")
});

// 상세페이지 불러오기
app.get("/detail/:postId", async (req, res) => {
	const { postId } = req.params;
	const post = await Post.findOne({ postId });
    res.render("detail.ejs", { post : post });
});

// 수정페이지 불러오기
app.get("/update/:articlesId", async (req, res) => {
    res.render("update.ejs")
});

app.listen(port, () => {
    console.log(port, '포트로 서버가 열렸어요!');
});
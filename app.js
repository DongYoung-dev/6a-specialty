const express = require('express');
const ejs = require('ejs');
const connect = require("./schemas");
const Post = require("./schemas/post");
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;

connect();

const postRouter = require("./routes/post");
const authRouter = require("./routes/auth");
const commentRouter = require("./routes/comment");
const comment = require('./schemas/comment');

const requestMiddleware = (req, res, next) => {
    console.log('Request URL:', req.originalUrl, ' - ', new Date());
    next();
};

app.use(express.static('static'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(requestMiddleware);
app.use(cookieParser());

app.use("/api", [postRouter, authRouter, commentRouter]);

// 메인페이지 불러오기
app.get('/', (req, res) => {
    res.render("index.ejs")
});

// 작성페이지 불러오기
app.get("/post", (req, res) => {
    res.render("post.ejs")
});

// 상세페이지 불러오기
app.get("/detail/:postId", (req, res) => {
    res.render("detail.ejs");
});

// 수정페이지 불러오기
app.get("/update/:articlesId", (req, res) => {
    res.render("update.ejs")
});

// 로그인페이지 불러오기
app.get("/login", (req, res) => {
    res.render("login.ejs")
});

app.listen(port, () => {
    console.log(port, '포트로 서버가 열렸어요!');
});
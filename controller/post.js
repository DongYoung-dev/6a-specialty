const Post = require("../schemas/post");
const Comment = require("../schemas/comment");

// 게시글 등록 applyPost
async function applyPost(req, res) {
    const { title, contents, date, time } = req.body;
    const { nickname } = res.locals.user;

    const postAmount = await Post.find();


    if (postAmount.length) {
        const postSorted = postAmount.sort((a,b) => b.postId - a.postId)
        const MaxPostNum = postSorted[0]['postId']
        const postId = MaxPostNum + 1
        const createdPost = await Post.create({ postId, title, nickname, contents, date, time });
    } else {
        const postId = 1
        const createdPost = await Post.create({ postId, title, nickname, contents, date, time });
    }

    res.json({ result: "게시글 등록 완료!" });
}

// 전체게시글 조회 showPost
async function showPost(req, res, next) {
	const postArr = await Post.find();
    let post = postArr.sort((a,b) => b.time - a.time)
    res.send({ post });
}

// 상세페이지 조회 detailPost
async function detailPost (req, res) {
    const { postId } = req.params;
    const post = await Post.findOne({ postId });
    res.send({ post });
}

// 게시글 수정 updatePost
async function updatePost (req, res) {
    const { postId } = req.params;  
    const { title, name, password, contents, date, time } = req.body;

    const pwCheck = await Post.find({ postId: postId })

    if (pwCheck[0]["password"] === password ) {
        await Post.updateOne({ postId: Number(postId) }, { $set: { title, name, password, contents, date, time } });
        res.json({ result: "success" })
    } else {
        res.json({ result: "fail" })
    }
}

// 게시글 삭제 deletePost
async function deletePost (req, res) {
    const { postId } = req.params
    const { password } = req.body
    
    const pwCheck = await Post.find({ postId: postId })

    if (pwCheck[0]["password"] === password) {
        await Post.deleteOne({ postId: postId })
        res.json({ result: "success" })
    } else {
        res.json({ result: "fail" })
    }
}

// //좋아요 likesPost
// async function likesPost (req, res) {

// }

module.exports = { applyPost, showPost, detailPost, updatePost, deletePost };
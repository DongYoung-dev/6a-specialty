const Comment = require("../schemas/comment");

async function showComment(req, res) {
    const { postId } = req.params;

    const comment = await Comment.find({ postId });
    res.send({
        comment
    });
}

async function applyComment(req, res) {
    try {
        console.log(res.locals)
        const { user } = res.locals;
        const { comment } = req.body;
        const { postId } = req.params;

        const commentAmount = await Comment.find();

        if (commentAmount.length) {
            const commentSorted = commentAmount.sort((a,b) => b.commentId - a.commentId)
            const MaxCommentNum = commentSorted[0]['commentId']
            const commentId = MaxCommentNum + 1
            await Comment.create({ postId, comment, nickname : user.nickname, commentId });
        } else {
            const commentId = 1
            await Comment.create({ postId, comment, nickname : user.nickname, commentId });
        }

        res.send({
            message: "댓글 등록 완료!",
        });
    } catch (err) {
        res.status(401).send({
            message: "댓글을 입력해주세요.",
        });
    }
}

async function updateComment(req, res) {
    const { comment, commentId } = req.body;

    await Comment.updateOne({ commentId }, { $set: { comment } })
    res.send({
        message: "댓글 수정 완료!",
    });
}

async function deleteComment(req, res) {
    console.log(req.body)
    try {
        const { commentId } = req.body;
        await Comment.deleteOne({ commentId });
        res.send({
            Message: "댓글 삭제 완료!",
        });
    } catch (err) {
        res.send({
            message: "자신이 작성한 댓글만 삭제할 수 있습니다.",
        });
    }
}

module.exports = { showComment, applyComment, updateComment, deleteComment };
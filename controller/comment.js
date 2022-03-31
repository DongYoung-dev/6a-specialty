const Comment = require("../schemas/comment");

async function showComment(req, res) {
    const { postId } = req.params;

    const comment = await Comment.find({ postId });
    res.send({
        comment,
    });
}

async function applyComment(req, res) {
    try {
        const { nickname } = res.locals.user;
        const { comment } = req.body;
        const { postId } = req.params;

        await Comment.create({ postId, comment, nickname });
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
    const { localNickname } = res.locals.user;
    const { comment } = req.body;
    const { commentNickname } = await Comment.findOne({ postId });

    if (localNickname !== commentNickname) {
        return res.send("자신이 작성한 댓글만 수정할 수 있습니다.");
    }

    await Comment.updateOne({ localNickname }, { $set: { comment } })
    res.send({
        message: "댓글 수정 완료!",
    });
}

async function deleteComment(req, res) {
    try {
        const { nickname } = res.locals.user;
        await Comment.deleteOne({ nickname });
        res.send({
            Message: "댓글 삭제 완료!",
        });
    } catch (err) {
        res.send({
            message: "자신이 작성한 댓글만 삭제할 수 있습니다.",
        });
    }
}

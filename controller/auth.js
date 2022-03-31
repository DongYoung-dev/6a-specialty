const User = require("../schemas/users");
const jwt = require("jsonwebtoken");
const UserSchema = require("../middlewares/joi");

async function join(req, res) {
    await UserSchema.validateAsync(req.body.data);
    console.log(req.body)
    
    const { userId, nickname, password, confirmPassword } = req.body;
    console.log(userId)
    try {
        const user = await User.find({ userId });

        if (user.length) {
            res.status(401).send({
                message: "중복된 아이디입니다",
            });
            return;
        }
        if (password !== confirmPassword) {
            res.status(400).send({
                message: "패스워드가 패스워드 확인란과 동일하지 않습니다.",
            });
            return;
        }
        if (password.indexOf(userId) !== -1) {
            res.status(400).send({
                message: "사용할 수 없는 암호입니다",
            });
            return;
        }

        await User.create({ userId, nickname, password });
        res.send({
            message: "가입 완료!",
        });
    } catch (err) {
        res.status(401).send({
            message: "아이디와 비밀번호를 확인해주세요",
        });
    }
}

async function login(req, res) {
    try {
        const { userId, password } = req.body;
        const user = await User.findOne({ userId });

        if (password === user.password) {

            const token = jwt.sign({ userId: userId }, "MYSECRETKEY");
            res.send({
                token,
                message: "로그인 완료!",
            });
        }
    } catch (err) {
        res.status(401).send({
            errorMessage: "닉네임 혹은 패스워드를 확인해주세요",
        });
    }
}

async function userMe(req, res) {
    const { auth } = res.locals;
    res.send({ auth });
}

module.exports = { join, login, userMe };

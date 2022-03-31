const jwt = require("jsonwebtoken");
const User = require("../schemas/users");

// 사용자 검사 미들웨어
module.exports = async (req, res, next) => {

    const { authorization } = req.headers;
    const [tokenType, tokenValue] = authorization.split(" ");

    if (tokenType !== "Bearer") {
        res.status(401).send({
            errorMessage: "로그인 후 사용하세요",
        });
        return;
    }
    try {
        const secretKey = process.env.SECRET_KEY;
        const { userId } = jwt.verify(tokenValue, `${secretKey}`);
        const user = await User.findOne({ email: userId });
        res.locals.user = user;
        next();
    } catch (err) {
        res.status(401).send({
            errorMessage: "로그인 후 사용하세요!",
        });
        return;
    }
};
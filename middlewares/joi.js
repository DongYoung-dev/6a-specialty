const Joi = require("joi");

const UserSchema = Joi.object({
    userId: Joi.string().min(3).required().alphanum().error(new Error("3글자 이상 알파벳과 숫자만 사용가능합니다")),
    nickname: Joi.string().required().error(new Error("닉네임을 입력해주세요")),
    password: Joi.string().min(4).required().error(new Error("4글자 이상 입력해주세요")),
    confirmPassword: Joi.valid(Joi.ref("password")).required().error(new Error("두 패스워드가 일치하지 않습니다")),
});

module.exports = UserSchema;
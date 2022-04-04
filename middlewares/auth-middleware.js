const jwt = require('jsonwebtoken');
const User = require('../schemas/users');

module.exports = async (req, res, next) => {
    try {
        if (!req.cookies.mytoken) {
            res.locals.auth = 'falseLogin';
        } else {
            try {
                const {userId} = jwt.verify(req.cookies.mytoken, "MYSECRETKEY");
                const existUser = await User.findOne({userId});
                if (!existUser) res.locals.auth = 'errorLogin';
                else {
                    res.locals.user = existUser;
                    res.locals.auth = 'trueLogin'; 
                }
            } catch (e) {
                console.log(e);
            
                
            }
        }
        next();
    } catch (e) {
        console.log(e);
        return;
    }
};
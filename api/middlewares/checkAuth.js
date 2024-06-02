const jwt = require('jsonwebtoken')

const checkAuth = (req, res, next) => {
    console.log(req.headers);

    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Auth failed: No token provided" });
        }
        jwt.verify(token, process.env.TOKEN_SECRET);
        next();
    } catch (error) {
        res.status(401).json({ message: "Auth failed" })
    }


};
module.exports = checkAuth;
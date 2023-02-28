const jwt = require("jsonwebtoken");
const createError = require("../utils/createError");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    
    if (!authHeader) return next(createError(401, "You are not authenticated!"))

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
        if (err) return next(createError(403, "Token is not valid!"))
        req.userId = payload.id;
        req.isSeller = payload.isSeller;
        next()
    });
};

module.exports = verifyToken;
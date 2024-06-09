"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtService = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const createTokens = (user) => {
    const accessToken = (0, jsonwebtoken_1.sign)({ id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '24h' });
    return accessToken;
};
const validateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const accessToken = authHeader;
    if (!accessToken)
        return res.status(400).json({ error: 'User not Authenticated!' });
    try {
        (0, jsonwebtoken_1.verify)(accessToken, process.env.TOKEN_SECRET, (err, decoded) => {
            console.log(err);
            if (err) {
                return res.status(401).json({ message: 'Invalid token' });
            }
            next();
        });
    }
    catch (err) {
        console.error(err);
        return res.status(400).json({ error: err });
    }
};
exports.jwtService = {
    createTokens,
    validateToken,
};

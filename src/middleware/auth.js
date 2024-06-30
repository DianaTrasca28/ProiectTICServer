const jwt = require('jsonwebtoken');
const token_secret = process.env.TOKEN_SECRET;

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader || authHeader.split(' ')[0] !== 'Bearer') {
        return res.sendStatus(401); // Unauthorized
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.sendStatus(401);
    }

    try {
        const decoded = jwt.verify(token, token_secret);
        req.user = decoded;
        next();
    } catch (err) {
        return res.sendStatus(403); // Forbidden
    }
}

module.exports = { authenticateToken };

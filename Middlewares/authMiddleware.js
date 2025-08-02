const JWT = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    // Check if token is present
    if(!token) {
        return res.status(401).json({ message: 'Unauthorized access', success: false });
    }
    try {
        // Verify the token
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        // Attach user ID to the request object
        req.userId  = decoded._id;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token', success: false });
    }
}

module.exports = authMiddleware;
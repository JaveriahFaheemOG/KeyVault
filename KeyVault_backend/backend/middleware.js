const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.userId = decoded.userId;  // Attach `userId` to the request object
        next();  // Pass control to the next middleware (the route handler)
    } catch (error) {
        res.status(403).json({ message: 'Forbidden' });
    }
};

module.exports = authenticateToken;
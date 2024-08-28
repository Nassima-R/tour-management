import jwt from 'jsonwebtoken';

// Verify user
export const verifyUser = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ success: false, message: 'Access Denied: No Token Provided!' });
    }

    try {
        const verified = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ success: false, message: 'Invalid Token' });
    }
};

// Verify admin
export const verifyAdmin = (req, res, next) => {
    verifyUser(req, res, () => {
        if (req.user && req.user.role === 'admin') {
            next();
        } else {
            res.status(403).json({ success: false, message: 'Access Denied: Admins Only!' });
        }
    });
};

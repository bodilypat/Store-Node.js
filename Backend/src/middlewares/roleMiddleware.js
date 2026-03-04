//src/middleware/roleMiddleware.js 

exports.authorize = (...allowedRoles) => {
    return (req, res, next) => {
        // Check if user exists (set by product middleware)
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Check if user has any of the allowed roles
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        next();
    };
};


const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('auth-token');

    if (!token) return res.status(401).json({ data: "Your are not authorized to use this feature" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.user = decoded;
        next();
    } catch (e) {
        res.status(400).json({ data: "Something went wrong... try again or contact us." });
    };
}

module.exports = auth

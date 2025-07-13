const jwt = require('jsonwebtoken');
const UserModel = require('../Models/User');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ msg: 'No token, authorization denied', success: false });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.findById(decoded._id).select('-password');
        
        if (!user) {
            return res.status(401).json({ msg: 'Token is not valid', success: false });
        }

        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid', success: false });
    }
};

module.exports = {
    authMiddleware
}; 
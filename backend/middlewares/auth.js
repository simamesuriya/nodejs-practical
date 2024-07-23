const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

module.exports = function (req, res, next) {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader) {
       
            return res.status(401).json({ msg: 'No token, authorization denied' });
        }
        if (!authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ msg: 'Invalid token format' });
        }
        const token = authHeader.replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;

        next();


        

        
    } catch (err) {
        console.error('Token verification failed:', err.message);
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

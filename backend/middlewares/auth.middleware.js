const jwt = require('jsonwebtoken');

module.exports.authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        const decoded = jwt.decode(token, process.env.JWT_SECRET);
        
        if(!token){
            res.status(403).json({message:"User not authorized", decoded})
        }
        req.userId = decoded.id;
        next();
        
    } catch (error) {
        next(error);
    }
}
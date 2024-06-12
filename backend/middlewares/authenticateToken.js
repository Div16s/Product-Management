const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.status(401).json({
        err: "Unauthorized Access, Please login to continue."
    });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err){
            console.log("Error in verifying token: ", err.message);
            return res.status(403).json({
                err: "Access denied! Your authentication token is invalid or has expired.",
            });
        }

        req.user = user;
        next();
    });
}

module.exports = authenticateToken;
const jwt = require('jsonwebtoken'); // Importing the jsonwebtoken module for token verification
const config = require('../configs/auth.config'); // Importing the auth.config file for secret key
const User = require('../models/user.model'); // Importing the User model
const constants = require('../utils/constants'); // Importing the constants file

// Middleware function to verify the JWT token
verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token']; // Extracting the token from the request headers

    if (!token) {
        return res.status(401).send({
            message: 'No token has been provided.'
        });
    }

    jwt.verify(token, config.secretKey, (err, decoded) => { // Verifying the token using the secret key
        if (err) {
            return res.status(401).send({
                message: 'Request cannot be authenticated. Token is invalid.'
            });
        }
        req.userId = decoded.id; // Storing the decoded user ID from the token in the request object

        next(); // Proceeding to the next middleware or route
    });
};
// Middleware function to check if the user is an admin
isAdmin = async (req, res, next) => {
    const user = await User.findOne({
        userId: req.userId
    }); // Finding the user by user ID in the database

    if (user && user.userType === constants.userTypes.admin) { // Checking if the user exists and has admin userType
        next(); // Proceeding to the next middleware or route
    } else {
        return res.status(403).send({
            message: 'You are not authorized for this kind of operation. This can be done only by an Admin.'
        });
    }
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin
};

module.exports = authJwt; // Exporting the authJwt object as a module

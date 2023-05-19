const User = require('../models/user.model'); // Importing the User model
const convertUserObject = require('../utils/convertUserObject'); // Importing the convertUserObject utility function

exports.findAll = async (req, res) => {
    try {
        let users = await User.find(); // Retrieving all users from the database
        if (users) {
            return res.status(200).send(convertUserObject.userResponse(users)); // Sending a response with converted user objects
        }
    } catch(err) {
        res.status(500).send({
            message:'Some internal error occurred'
        });
    }
};

exports.findById = async (req, res) => {
    const userIdRequest = req.params.userId;

    const user = await User.find({
        userId: userIdRequest
    }); // Retrieving a specific user by userId from the database

    if (user.length > 0) {
        return res.status(200).send(convertUserObject.userResponse(user)); // Sending a response with the converted user object
    } else {
        return res.status(500).send({
            message: `User with Id ${userIdRequest} is not present.`
        });
    }
};

exports.update = async (req, res) => {
    const userIdRequest = req.params.userId;
    try {
        const user = await User.findOne({
            userId: userIdRequest
        }); // Finding a specific user by userId in the database
        if (!user) {
            return res.status(403).send({
                message: `User with Id ${userIdRequest} is not present.`
            }); // Returning an error response if the user is not found
        }
        user.name = req.body.name;
        user.userType = req.body.userType;
        user.userStatus = req.body.userStatus;
        await user.save(); // Saving the updated user to the database
        return res.status(200).send(convertUserObject.userResponse(user)); // Sending a response with the converted user object
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            message: 'Internal server error'
        });
    }
};

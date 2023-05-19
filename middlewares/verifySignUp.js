const User = require('../models/user.model');
const constants = require('../utils/constants');

// Step 1: Define a validation middleware for sign-up requests
validateSignUpRequest = async (req, res, next) => {
	// Implement logic for validating the request

	// Step 2: Validate the name
	if (!req.body.name) {
		res.status(400).send({
			message: 'Failed! Name is not provided'
		});
		return;
	}

	// Step 3: Validate the userId
	if (!req.body.userId) {
		res.status(400).send({
			message: 'Failed! UserId is not provided'
		});
		return;
	}

	// Step 4: Check if the userId already exists
	const user = await User.findOne({ userId: req.body.userId });
	if (user != null) {
		res.status(400).send({
			message: 'Failed! UserId already exists'
		});
		return;
	}

	// Step 5: Validate the email
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression pattern for email validation
	const isValidEmail = emailRegex.test(req.body.email);

	if (!isValidEmail) {
  		res.status(400).send({
    		message: 'Failed! Invalid email'
  		});
  		return;
		}


	// Step 6: Check if the email already exists
	const email = await User.findOne({ email: req.body.email });
	if (email != null) {
		res.status(400).send({
			message: 'Failed! Email already exists'
		});
		return;
	}

	// Step 7: Validate the userType
	const userType = req.body.userType;
	const validUserTypes = [ constants.userTypes.customer, constants.userTypes.admin, constants.userTypes.engineer ];
	if (userType && !validUserTypes.includes(userType)) {
		res.status(400).send({
			message: 'UserType provided is invalid'
		});
		return;
	}

	// Step 8: Move to the next middleware/route handler
	next();
};

// Step 9: Define an object containing the validation middleware
const verifySignUp = {
	validateSignUpRequest: validateSignUpRequest
};

module.exports = verifySignUp;


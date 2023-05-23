const constants = require('../utils/constants');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../configs/auth.config');

// Step 1: Sign up a user
exports.signUp = async (req, res) => {
  var userStatus = req.body.userStatus;
  var userType = req.body.userType;
  
  // Step 2: Determine user status based on user type
  if (userType === constants.userTypes.customer) {
    userStatus = constants.userStatus.approved;
  } else {
    userStatus = constants.userStatus.pending;
  }
  try {
    // Step 3: Create a new user in the database
    const createUser = await User.create({
      name: req.body.name,
      userId: req.body.userId,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      userType: req.body.userType,
      userStatus: userStatus
    });

    // Step 4: Prepare response data
    const postResponse = {
      name: createUser.name,
      userId: createUser.userId,
      email: createUser.email,
      userType: createUser.userType,
      userStatus: createUser.userStatus,
      createdAt: createUser.createdAt,
      updatedAt: createUser.updatedAt
    };

    // Step 5: Send the successful response
    res.status(200).send(postResponse);
  } catch (e) {
    console.log('Error occurred while creating the user');
    // Step 6: Send an error response if an error occurred
    res.status(500).send({
      message: 'Some internal error occurred while creating the user'
    });
  }
};

// Step 7: Sign in a user
exports.signIn = async (req, res) => {
  // Step 8: Find the user by userId in the database
  const user = await User.findOne({ userId: req.body.userId });
  if (!user) {
    // Step 9: Send an error response if the user doesn't exist
    res.status(400).send({
      message: "Failed! UserId doesn't exist"
    });
    return;
  }

  if (user.userStatus !== constants.userStatus.approved) {
    // Step 10: Send an error response if user status is not approved
    res.status(403).send({
      message: "Can't allow user to login as the status is " + user.userStatus
    });
    return;
  }

  // Step 11: Check if password matches
  var isPasswordValid = bcrypt.compareSync(req.body.password, user.password);

  if (!isPasswordValid) {
    // Step 12: Send an error response if the password is invalid
    return res.status(401).send({
      message: 'Password provided is invalid'
    });
  }

  // Step 13: Generate an access token
  var token = jwt.sign({ id: user.userId }, authConfig.secretKey, {
    expiresIn: 86400
  });

  // Step 14: Prepare response data
  res.status(200).send({
    name: user.name,
    userId: user.userId,
    email: user.email,
    userType: user.userType,
    userStatus: user.userStatus,
    accessToken: token
  });
};


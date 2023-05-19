const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true // Name of the user
  },
  userId: {
    type: String,
    required: true,
    unique: true // Unique identifier for the user
  },
  password: {
    type: String,
    required: true,
    minLength: 6 // User's password (minimum length: 6 characters)
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true, // User's email address (case-insensitive, unique)
    //  validate: {
    //         validator: function (value) {
    //             // Custom validation function
    //             return /\S+@\S+\.\S+/.test(value); // Check if email contains the "@" symbol
    //         },
    //         message: 'Invalid email format',
    //     },
  },
  userType: {
    type: String,
    required: true,
    default: 'CUSTOMER' // Type of user (default: 'CUSTOMER')
  },
  userStatus: {
    type: String,
    immutable: true,
    default: 'PENDING' // Status of the user (default: 'PENDING')
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => {
      return Date.now();
    } // Date when the user was created (immutable)
  },
  updatedAt: {
    type: Date,
    default: () => {
      return Date.now();
    } // Date when the user was last updated
  }
});

//Create the User model using the user schema
module.exports = mongoose.model('User', userSchema);


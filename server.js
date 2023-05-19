/*
1. Establish a connection with mongoDB
2. Start our server which will listen for HTTP requests at port number 8080
*/

// Import required dependencies and modules
const mongoose = require('mongoose');
const dbConfig = require('./configs/db.config');
const serverConfig = require('./configs/server.config');
const User = require('./models/user.model');
const bcrypt = require('bcryptjs');

// Express settings
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
app.use(bodyParser.json);
app.use(bodyParser.urlencoded({ extended: true }));

// Establish DB connection
mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;

// Check for DB connection errors
db.on('error', () => {
	console.log('Error while connecting to the database');
});

// Handle successful DB connection
db.once('open', () => {
	console.log('Connection successful with the database');
	// Create an admin user if it doesn't exist
	init();
});

// Function to create admin user
async function init() {
	// Check if admin user already exists
	var user = await User.findOne({ userId: 'admin' });
	if (user) {
		console.log('Admin user already exists');
		return;
	}
	try {
		// Create admin user
		user = await User.create({
			name: 'Jayesh Chauhan',
			userId: 'admin',
			email: 'officialjitandrachauhan@gmail.com',
			userType: 'ADMIN',
			userStatus: 'APPROVED',
			password: bcrypt.hashSync('Welcome1', 12)
		});
		console.log(user);
	} catch (e) {
		console.log(`Error while creating admin user ${e}`);
	}
}

// Import routes
require('./routes/auth.routes')(app);

// Start the server to listen for HTTP requests at the specified port
app.listen(serverConfig.PORT, () => {
	console.log('Application is started on port ' + serverConfig.PORT);
});

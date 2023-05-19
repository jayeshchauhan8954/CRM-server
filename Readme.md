we will create CRM application so there are the steps to create first backend 

#1 first do npm init to initialise npm
#2 to create server and run it well we will install express.js using - npm i express
#3 we can also install nodemon to make our server up and running using - npm i nodemon
#4 now we will create server.js file for our main file and change name from index.js to server.js
also write "devStart": "nodemon server.js" in script in package.json file

#5 now we will install mongoose for establising connection with database using - npm i mongoose 

#6 now we will go to server.js and create connections

#7 write first - const mongoose = require('mongoose')

#8 now to create connection , write - 
// Establish DB connection 
mongoose.connect('mongodb://localhost/crm_db');

#9 // to check the connection is done or not

const db = mongoose.connection;

db.on('error', () => {
	console.log('Error while connecting DB');
});
db.once('open', () => {
	console.log('connection succesfully with DB');
});


#10 create one .gitignore file and write - /node_modules

#11 const express = require('express');
const app = express();

#12 // app (Server) to listen for HTTP requests at port 8080

app.listen('8080', () => {
	console.log('Application is started on the port 8080');
});



19.may.2023 => Agenda
1. API to get list of all users
2. API to get a user based on userId (querry Parameter)
3. API for updating userType and userStatus
   
   Only admin should be able to update and find these above things
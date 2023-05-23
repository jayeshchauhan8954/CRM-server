const { authJwt, verifySignUp } = require('../middlewares'); // Importing the authJwt and verifySignUp middleware
const userController = require('../controllers/user.controller'); // Importing the userController module

module.exports = function (app) {
    app.get('/crm/api/v1/users/', [authJwt.verifyToken, authJwt.isAdmin], userController.findAll);
    // Define a route for getting all users, with token verification and admin authorization middleware

    app.get('/crm/api/v1/users/:userId', [authJwt.verifyToken, authJwt.isAdmin], userController.findById);
    // Define a route for getting a specific user by ID, with token verification and admin authorization middleware

    app.put('/crm/api/v1/users/:userId', [authJwt.verifyToken, authJwt.isAdmin], userController.update);
    // Define a route for updating a specific user by ID, with token verification and admin authorization middleware
}
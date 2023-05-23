const authController = require('../controllers/auth.controller');
const { verifySignUp } = require('../middlewares');

module.exports = function(app) {
  // Endpoint for user sign up, invoking the validation middleware
  app.post('/crm/api/v1/auth/signup', [ verifySignUp.validateSignUpRequest ], authController.signUp);
  
  // Endpoint for user sign in
  app.post('/crm/api/v1/auth/signin', authController.signwIn);
};
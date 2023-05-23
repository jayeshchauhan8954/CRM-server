// Exporting an object containing the verification middleware
const verifySignUp = require('./verifySignUp');
const authJwt = require('./authJwt')
module.exports = {
	verifySignUp,
	authJwt
};


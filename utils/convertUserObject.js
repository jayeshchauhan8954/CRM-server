exports.userResponse = (users) => {
    let usersResult = []; // Initialize an empty array to store the converted user objects

    users.forEach(user => {
        usersResult.push({
            name: user.name, // Extract and add the name property from the user object
            userId: user.userId, // Extract and add the userId property from the user object
            email: user.email, // Extract and add the email property from the user object
            userType: user.userType, // Extract and add the userType property from the user object
            userStatus: user.userStatus // Extract and add the userStatus property from the user object
        });
    });

    return usersResult; // Return the array of converted user objects
};
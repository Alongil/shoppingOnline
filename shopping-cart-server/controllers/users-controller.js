let usersLogic = require("../logic/users-logic");
const express = require("express");
const router = express.Router();
const usersCache = require("../logic/cache-module");


// first stage of registaring, checking that the user email and is the user entered are not already in the system
router.post("/register", async (request, response, next) => {
    // console log for tests
    console.log("we are in register");
    // Extracting the JSON from the packet's BODY
    let user = request.body;
    let proceedRegistration; 
    try {
        // calling the relavent function in users logic
        let successfullFirstStageRegistration = await usersLogic.isEmailOrIdNumberAlreadyExist(user);
        // console log for tests
        console.log("the response from usersLogic isEailOrIdNumberExistTwice is After me");
        console.log(successfullFirstStageRegistration);
        // bulding the succefull serer response object that will be sent to client 
        if(successfullFirstStageRegistration == false){
            proceedRegistration = {
                massage : "Data Valid",
                status: 200,
                }
            // sending the response to the client
            response.json(proceedRegistration);
            }
        }
    catch (error) {
        // console log for test
        console.error(error);
        console.log("initial user data is invalid");
        // calling the error handel with the error we recieved
        return next(error);
    }
});
// adding the user to the data base
router.post("/register/final", async (request, response, next) => {
    // Extracting the JSON from the packet's BODY
    console.log("we are in register final stage");
    let user = request.body;
    try {
            // calloing the relavent function in user logic
            successRegistration = await usersLogic.addUser(user);
            // sending the response to the client
            response.json(successRegistration);
    }
    catch (error) {
        console.error(error);
        // calling the error handel with the error we recieves
        return next(error);
    }
});

// updating the user - only by admin
router.post("/admin/updateuser", async (request, response, next) => {
    // Extracting the JSON from the packet's BODY
    console.log("we are in admin update user");
    let user = request.body;
    try {
        // calling the relavent function in users logic
        succefullServerResponse = await usersLogic.updateUser(user);
        console.log(succefullServerResponse); 
        // sending the response to the client
        response.json(succefullServerResponse);
    }
    catch (error) {
        // console log for test
        console.log("Failed to UPDATE user");
        console.log(error);
        // calling the error handel with the error we recieves
        return next(error);
    }
});

// loging the user
router.post("/login", async (request, response, next) => {
    // console log for test
    console.log("we are in the login section");
    // Extracting the JSON from the packet's BODY
    let user = request.body;
    try {
        // console.log("we are trying");
        let successfullLoginData = await usersLogic.login(user);
        // sending the response back to the client
        response.json(successfullLoginData);
    }
    catch (error) {
        // console log for test
        console.error(error);
        // calling the error handel with the error we recieves
        return next(error);
    }
}); 

// POST http://localhost:3000/users/me - getting the cuurent user
router.post("/me", async (request, response, next) => {
    console.log("we are in getUser");
    let user = request.body;
    console.log(user);

        // In order to succeed, we must extract the user's id from the cache
    try {
        let authorizationString = request.headers["authorization"];
        // Removing the bearer prefix, leaving the clean token
        let token = authorizationString.substring("Bearer ".length);
        console.log(token);
        let userIdNumber = usersCache.get(token);
        // console log for tests
        console.log("after me is user id number from cahce");
        console.log(userData.idNumber);
        // calling the relavent function
        user = await usersLogic.getUser(userIdNumber);
        console.log(user);
        // sending the response back to the client
        response.json(user);
    } 
    catch(error) {
        // console log the error for tests
        console.error(error);
        // calling the error handel with the error we recieves
        return next(error);
    }
}); 





module.exports = router;

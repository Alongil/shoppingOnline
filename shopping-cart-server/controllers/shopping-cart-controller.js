let shoppingCartLogic = require("../logic/shopping-cart-logic");
const express = require("express");
const router = express.Router();
const usersCache = require("../logic/cache-module");

// adding shopping cart to user(check if the the validation for the id from the cache needs to be in the controller or the logic)
router.post("/add", async (request, response, next) => {
    console.log("we are in new shoppingCart");
    // Extracting the JSON from the packet's BODY
        let user = request.body;
        try {
            // getting the token from the headers of the request
            let authorizationString = request.headers["authorization"];
            // removing the string before the token to get a clean token
            let token = authorizationString.substring("Bearer ".length);
            // console log the token for test
            console.log(token);
            // getting the user saved in the cache
            let userFromCache = usersCache.get(token);
            // console log for tests
            console.log("after me is user is number in shopping cart");
            console.log(userFromCache);
             // comparing the user id from cache to the user id recievd from the client to check if they are identical, if not, sending an error
            if(userFromCache.idNumber != user.idNumber) {
                throw new error("UNAUTHORIZED");
            }
            // calling the relavent function in shopping cart controller
            successfullServerResponse = await shoppingCartLogic.addShoppingCart(userFromCache.idNumber);
            console.log(successfullServerResponse) 
            // sending the response to the client 
            response.json(successfullServerResponse);
        }
        catch (error) {
            // console log the error
            console.log("shopping cart wasnt added");
            console.log(error);
            // calling the error handel with the error we recieves
            return next(error);
        }
    });
// closing shopping cart to user(check if the the validation for the id from the cache needs to be in the controller or the logic)
router.post("/close", async (request, response, next) => {
    // Extracting the JSON from the packet's BODY
    console.log("we are in close ahoppingCart");
    let cart = request.body;
    // console log for tests
    console.log("after me is the cart from the client");
    console.log(cart.id);
    try {
         // getting the token from the headers of the request
         let authorizationString = request.headers["authorization"];
         // removing the string before the token to get a clean token
         let token = authorizationString.substring("Bearer ".length);
         // console log the token for test
         console.log(token);
         // getting the user saved in the cache
         let userFromCache = usersCache.get(token);
         // console log for tests
         console.log("after me is user is number in shopping cart");
         console.log(userFromCache);
         // comparing the user id from cache to the user id recievd from the client to check if they are identical, if not, sending an error
         if(userFromCache.idNumber != cart.userId) {
            throw new error("UNAUTHORIZED");
         }
        // calling the relavent function in shopping cart controller
        successfullServerResponse = await shoppingCartLogic.closeShoppingCart(cart.id);
        console.log(successfullServerResponse) 
        // sending the response to the client 
        response.json(successfullServerResponse);
        }
    catch (error) {
            // console log the error
        console.log("shopping cart wasnt closed");
        console.log(error);
        // calling the error handel with the error we recieves
        return next(error);
        }
    });
    





module.exports = router;


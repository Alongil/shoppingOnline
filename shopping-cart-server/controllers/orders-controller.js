let ordersDao = require("../logic/orders-logic");
const express = require("express");
const router = express.Router();
const usersCache = require("../logic/cache-module");
const ordersLogic = require("../logic/orders-logic");

// adding an order to DB
router.post("/add", async (request, response, next) => {
    // console log for tests
    console.log("we are in order controller");
    // Extracting the JSON from the packet's BODY
    let order = request.body;
    try {
            let authorizationString = request.headers["authorization"];
            // Removing the bearer prefix, leaving the clean token
            let token = authorizationString.substring("Bearer ".length);
            console.log(token);
            let userData = usersCache.get(token);
            console.log(userData)
            // setting the customerId in order to be the one we got from the cache
            order.customerId = userData;
            // console log for tests
            console.log("after me is user id number from cahce");
            console.log(userData);
            // console.log(order.customerId);
            // calling the relavent function in product controller
            successAddingOrder = await ordersLogic.addOrder(order);
            // console log for tests
            console.log("after me is succes adding order"); 
            console.log(successAddingOrder) 
            // sencing the response back to the client
            response.json(successAddingOrder);
        }
    catch (error) {
            console.log("order wasnt added");
            console.log(error);
            // calling the error handel with the error we recieves
            return next(error);
        }
    });

// getting the total number of orders made in the website
router.get("/number", async (request, response, next) => {
    console.log("we are in get number of orders");

    try {
        // calling the relavent function in orders logic
        numberOfOrders = await ordersDao.getNumberOfOrders();
        // console log section for tests
        console.log("numberOfOrders");
        console.log(numberOfOrders);
        // sendong the response bacl to the client
        response.json(numberOfOrders);
    } 
    catch(error) {
        return next(error);
        }
    }
); 
// getting all the dates that repeat more then twice
router.get("/unavailabledates", async (request, response, next) => {
    console.log("we are in get number of Products");

    try {
        // calling the relavent function in orders logic
        unavailableDates = await ordersDao.getUnavailableDates();
        // console log section for tests
        console.log("unavailable dates in orders controller:");
        console.log(unavailableDates);
        // sendong the response bacl to the client
        response.json(unavailableDates);
    } 
    catch(error) {
        return next(error);
        }
    }
); 



module.exports = router;


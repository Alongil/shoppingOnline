let ordersDao = require("../dao/orders-dao");
let cacheModule = require("./cache-module"); 
const jwt = require("jsonwebtoken");
const config = require("../config.json");
let ErrorType = require("./../error/error-type");
let ServerError = require("./../error/server-error");
const { json } = require("express");
let shoppingCartLogic = require("../logic/shopping-cart-logic");


// adding an order to user in DB
async function addOrder(order){
    await validateOrder(order);   
    let successfullOrderAdded = await ordersDao.addOrder(order);
    // closing the cart after creating the order
    await shoppingCartLogic.closeShoppingCart(order.cartId);
    return successfullOrderAdded;
}

// getting all the number of orders from the DB
async function getNumberOfOrders() {
    let numberOfProducts = await ordersDao.getNumberOfOrders();
    console.log(numberOfProducts);

    return numberOfProducts;
}

// getting all the delivery dates that are repeating 3 times.
async function getUnavailableDates() {
    let unavailableDates = await ordersDao.getUnavailableDates();
    console.log(unavailableDates);

    return unavailableDates;
}
// validating that the recieved delivery date from the client is valid (not already taken)
async function isDeliveryDateTaken(order) {
    let dateTaken = false;
    let unavailableDates = await ordersDao.getUnavailableDates();

    unavailableDates.forEach((element, i) => {
        if(element.deliveryDate == order.deliveryDate) {
            console.log("index after me");
            dateTaken = true;
       }
    });
       return dateTaken; 
}

// validating that all fields of order reived from client are valid
async function validateOrder(order) {
    if(order.customerId == null || order.customerId == ""){
        console.log("customerId is required");
        throw new ServerError (ErrorType.IS_REQUIRED_FIELD); 
    } 
    if(order.cartId == null || order.cartId == "") {
        console.log("cartId is required");
        throw new ServerError (ErrorType.IS_REQUIRED_FIELD); 
        
    } 
    if(order.city == null || order.city == ""){
        console.log("city is required");
        throw new ServerError (ErrorType.IS_REQUIRED_FIELD); 
        
    } 
    if(order.street == null || order.street == ""){
        console.log("street is required");
        throw new ServerError (ErrorType.IS_REQUIRED_FIELD); 
    }
    if(order.lastFourCardDigits == null || order.lastFourCardDigits == ""){
        console.log("lastFourCardDigits is required");
        throw new ServerError (ErrorType.IS_REQUIRED_FIELD); 
        
    }
    // if the final price recieved from client does not match the cart price in DB return an error
    if(order.finalPrice !== await ordersDao.getOrderFinalPrice(order.cartId)){
        console.log("order final price dont math to that recieved from the client");
        throw new ServerError(ErrorType.ORDER_PRICE_DONT_MATCH);
    }
    // if the delivery date is taken return an error
    if(await isDeliveryDateTaken(order)){
        console.log("delivery date la la la l al a");
        console.log(order.deliveryDate);
        throw new ServerError (ErrorType.DELIVERY_DATE_TAKEN);
    }
    return true;
}

// gettiמg the final price of an order from DB
// async function getOrderFinalPrice(order) {
//     order.finalPrice = await ordersDao.getOrderFinalPrice(order.cartId);
//     return order;
// }
    
module.exports = {
    getNumberOfOrders,
    getUnavailableDates,
    addOrder
}
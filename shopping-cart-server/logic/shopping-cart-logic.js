let shoppingCartDao = require("../dao/shopping-cart-dao");
let cacheModule = require("./cache-module"); 
const jwt = require("jsonwebtoken");
const config = require("../config.json");
let ErrorType = require("./../error/error-type");
let ServerError = require("./../error/server-error");
const { json } = require("express");
// adding a shopping cart to client
async function addShoppingCart(userIdNumber){

    console.log("WE ARE IN LOGIC add shopping cart");
    let successfullServerResponse = await shoppingCartDao.addShoppingCart(userIdNumber);

    return successfullServerResponse;
} 
// closing  shopping cart 
async function closeShoppingCart(cartId) {
    let successfullServerResponse = await shoppingCartDao.closeShoppingCart(cartId);

    return successfullServerResponse;
}






module.exports = {
    addShoppingCart,
    closeShoppingCart,
}
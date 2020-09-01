let cartItemsLogic = require("../logic/cart-items-logic");
const express = require("express");
const router = express.Router();
const usersCache = require("../logic/cache-module");

// getting the cart items acording to the cart id in the url parameters
router.get("/items/:id", async (request, response, next) => {
    console.log("we are in cartItems controller");
    // extracting the cart id from the url
    let cartId = request.params.id;
    try {
        // calling the relavent function in cart item logic
        cartItems = await cartItemsLogic.getCartItemsByCartId(cartId);
        // console log section for tests
        console.log("number of items in products controller:");
        console.log(cartItems);
        console.log("server response in cartItems controller: of my producys");
        // sending the response to the client
        response.json(cartItems);
    } 
    catch(error) {
        // handeling the error
        return next(error);
        }
}); 
// adding an item to cart 
router.post("/add", async (request, response, next) => {
    console.log("we are in new cartItem");
    // Extracting the JSON from the packet's BODY
    let cartItem = request.body;
    try {
        // calling the relavent function in cart item logic
        successAddingCartItem = await cartItemsLogic.addCartItemToCart(cartItem);
        // console log section for tests
        console.log("after me is succes adding cartItem"); 
        console.log(successAddingCartItem)   
        // sending the response to the client
        response.json(successAddingCartItem);
    }
    catch (error) {
        
        console.log("product wasnt added");
        console.log(error);
        // handeling the error
        return next(error);
    }
});
// deliting an item from the relavent cart acording to the id
router.delete("/item/:id", async (request, response, next) => {
    // Extracting the JSON from the packet's params since there is no body in a delete request
    let itemId = request.params.id;
    try {
        // calling the relavent function in cart item logic
        successfullServerResponse = await cartItemsLogic.deleteCartItem(itemId);
        // console log section for tests
        console.log("delete item");
        console.log(successfullServerResponse);
        // sending the response to the client
        response.json(successfullServerResponse);
    }
    catch(error) {
        // handeling the error       
        return next(error);
        }
});
// updating the item in the cart (in case the client wants to change the quantity to the product)
router.put("/updateItem", async (request, response, next) => {
    // Extracting the JSON from the packet's BODY
        console.log("we are in cart Item update product");
        let cartItem = request.body;
        try {
            // calling the relavent function in cart item logic
            succefullServerResponse = await cartItemsLogic.updateCartItem(cartItem);
            console.log(succefullServerResponse); 
            // sending the response to the client
            response.json(succefullServerResponse);
        }
        catch (error) {
            console.log("Failed to UPDATE cartItem");
            console.log(error);
            // handeling the error       
            return next(error);
    }
});
// deliting all the cart items in the cart
router.delete("/all/:id", async (request, response, next) => {
    // Extracting the JSON from the packet's params since there is no body in a delete request
    let cartId = request.params.id;
    try {
        // calling the relavent function in cart item logic
        successfullServerResponse = await cartItemsLogic.deleteAllCartItem(cartId);
        console.log("delete item");
        console.log(successfullServerResponse);
        // sending the response to the client
        response.json(successfullServerResponse);
    }
    catch(error) {
        // handeling the error       
        return next(error);
        }
});







module.exports = router;


let cartItemsDao = require("../dao/cart-items-dao");
let productsLogic = require("../logic/products-logic");
let cacheModule = require("./cache-module"); 
const jwt = require("jsonwebtoken");
const config = require("../config.json");
let ErrorType = require("./../error/error-type");
let ServerError = require("./../error/server-error");
const { json } = require("express");

// getting all cart items
async function getCartItems(cartId) {
    if(cartId == null){
        throw new ServerError (ErrorType.GENERAL_ERROR); 
    }
    let cartItems = await cartItemsDao.getCartItems(cartId);
    console.log(cartItems);

    return cartItems;
}
// adding cart item to cart
async function addCartItemToCart(cartItem){

    if(!validateCartItem){
        console.log("we are in validate cart item in cart item logic add item to cart");
        return;
    }
        cartItem.totalPrice = await getItemTotalPriceFromDb(cartItem);
        cartItem = await cartItemsDao.addCartItemToCart(cartItem);

        return cartItem;
} 
// deleting cart item
async function deleteCartItem(itemId){
        successfullServerResponse = await cartItemsDao.deleteCartItem(itemId);
        return successfullServerResponse;          
}
// updating cart item in cart
async function updateCartItem(cartItem) {

    if(!validateCartItem) {
        console.log("fields are required in cartItem");
        return; 
    }
    cartItem.totalPrice = await getItemTotalPriceFromDb(cartItem);
    successfullUpdate = await cartItemsDao.updateCartItem(cartItem);

   console.log(successfullUpdate);
   return successfullUpdate;
} 
// getting the total price of an item from DB
async function getItemTotalPriceFromDb(cartItem) {
    productId = cartItem.productId;
    productPrice = await productsLogic.getProductPriceById(productId)
    totalPrice = cartItem.quantity * productPrice.price;
    return totalPrice
}
// deleting all items from DB
async function deleteAllCartItem(cartId){
    successfullServerResponse = await cartItemsDao.deleteAllCartItem(cartId);
    return successfullServerResponse;  
}
// Validating reqired fields in cart item
function validateCartItem(cartItem) {
    if(cartItem.productId == null || cartItem.productId == ""){
        console.log("cartItem name is required");
        throw new ServerError (ErrorType.IS_REQUIRED_FIELD); 
    } 
    if(cartItem.quantity == null || cartItem.quantity == "") {
        console.log("price is required");
        throw new ServerError (ErrorType.IS_REQUIRED_FIELD); 
        
    } 
    if(cartItem.cartId == null || cartItem.cartId == ""){
        console.log("category_id is required");
        throw new ServerError (ErrorType.IS_REQUIRED_FIELD); 
    } 
    return true;
}

module.exports = {
    getCartItems,
    addCartItemToCart,
    deleteCartItem,
    updateCartItem,
    deleteAllCartItem
}
let connection = require ("./connection-wrapper");
let ErrorType = require("../error/error-type");
let ServerError = require("../error/server-error");

// getting the cart items using the cart id
async function getCartItems(cartId) {
    // the sql we are sending to the DB
    let sql = "select p.id as productId, p.product_name as productName, p.price, p.img_src as imgSrc, p.category_id as categoryId,c.quantity, total_price as totalPrice, c.id as cartItemId\
    from products p\
    left join cart_items as c on c.product_id = p.id\
    where c.cart_id = ?";
    // the parameters we send
    let parameters = [cartId];

    try {
        // calling the relavent function in our connection-wrapper file
        cartItems = await connection.executeWithParameters(sql, parameters);
    }
    catch(e){
        // console log for tests, resching here means we have an error
        console.log(e);
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(cartItems), e);
    }
    // console log for tests
    console.log(cartItems);
    // returning an array of cart items to the upper lever (cart-items-logic)
    return cartItems;
}
// adding an item to the relavent cart
async function addCartItemToCart(cartItem){
    // console log for tests
    console.log("we are in addProductToCart dao");
    // the sql we are sending to the DB
    let sql = "INSERT INTO cart_items (product_id, quantity, total_price, cart_id) values(?, ?, ?, ?)";
    // the parameters we send
    let parameters = [cartItem.productId, cartItem.quantity, cartItem.totalPrice, cartItem.cartId];
    try {
        // calling the relavent function in our connection-wrapper file
        succefullServerResponse = await connection.executeWithParameters(sql, parameters);
    }
    catch(e){
        // console log for tests, resching here means we have an error
        console.log("we are in catch of addcartItem dao");
        console.log(e);
        // throwing a new server error in case we have an error
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(cartItem), e);
    }  

    console.log(succefullServerResponse);
    // building the cart item object (not sure we need this, not returning an error should )
    cartItem = {
        id: succefullServerResponse.insertId,
        productId: cartItem.productId,
        quantity: cartItem.quantity,
        totalPrice: cartItem.totalPrice,
        cartId: cartItem.cartId,
        massage: "product was successfully added to cart"
    }
    console.log(cartItem)
    // returning the object that was added
    return cartItem;
}

// deleting an item from  cart
async function deleteCartItem(itemId) {
    // the sql we are sending to the DB
    let sql = "delete from cart_items where id=?";
    // the parameters we send
    let parameters = [itemId];
    let successfullDeleteFromDb;
    try {
        // calling the relavent function in our connection-wrapper file
        successfullDeleteFromDb =  await connection.executeWithParameters(sql, parameters);
    }
    catch(e){
        console.log(e);
        // throwing a new server error in case we have an error
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(user), e);
    }
    // returning the response to the upper level
    return successfullDeleteFromDb;
}

// updating item in cart
async function updateCartItem(cartItem){
    // the sql we are sending to the DB
    let sql = "UPDATE cart_items SET quantity= ?, total_price = ? where product_id= ? and cart_id = ?";
    // the parameters we send
    let parameters = [cartItem.quantity, cartItem.totalPrice, cartItem.productId, cartItem.cartId ];
    let successfullUpdateServerResponse;
    try {
        // calling the relavent function in our connection-wrapper file
        successfullUpdateServerResponse = await connection.executeWithParameters(sql, parameters);
        // console log for tests
        console.log(successfullUpdateServerResponse);
    }
    catch(e){
        // console log for tests, resching here means we have an error
        console.log(e);
        // throwing a new server error in case we have an error
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(cartItem), e);
    }
    // console log for tests
    console.log(JSON.stringify(successfullUpdateServerResponse));
    // returning the successfull server response to the cart-item-logic
    return successfullUpdateServerResponse;
}
// deleting all items from a cart
async function deleteAllCartItem(cartId) {
    // the sql we are sending to the DB
    let sql = "delete from cart_items where cart_id=?";
    // the parameters we send
    let parameters = [cartId];
    let successfullDeleteFromDb;
    try {
        // calling the relavent function in our connection-wrapper file
        successfullDeleteFromDb =  await connection.executeWithParameters(sql, parameters);
        console.log(JSON.stringify(successfullDeleteFromDb) + "cart items have been succefully deleted");
    }
    catch(e){
        // console log the error for test
        console.log(e);
        // throwing a new server error in case we have an error
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(user), e);
    }
    // returning the successfull server response to the cart-item-logic
    return successfullDeleteFromDb;
}

module.exports = {
    getCartItems,
    addCartItemToCart,
    deleteCartItem,
    updateCartItem,
    deleteAllCartItem
};
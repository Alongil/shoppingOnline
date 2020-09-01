let connection = require ("./connection-wrapper");
let ErrorType = require("./../error/error-type");
let ServerError = require("./../error/server-error");
// adding a shopping cart to a client
async function addShoppingCart(userIdNumber) {
    console.log("we are in shoppingCart dao");
    let sql = "INSERT INTO shopping_cart (user_id, isCheckedOut) values(?, 'false')";
    let parameters = [userIdNumber];
    try {
    succefullServerResponse = await connection.executeWithParameters(sql, parameters);
    }
    catch(e){
        console.log("we are in catch of shoppingCart dao");
        console.log(e);
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(succefullServerResponse), e);
    }   
    console.log(succefullServerResponse);
    let succefullAddCart = {
        message: "New shopping cart Was created",
        Status: 200,
        userId: userIdNumber,
        id: succefullServerResponse.insertId
    }
    console.log(succefullAddCart)
    return succefullAddCart;
}
// closing a shopping cart to a client
async function closeShoppingCart(cartId) {
    console.log("we are in shoppingCart dao");
    let sql = "UPDATE shopping_cart SET isCheckedOut = 'true' where id = ?";
    let parameters = [cartId];
    console.log("this is cart id after me");
    console.log(cartId);
    try {
    succefullServerResponse = await connection.executeWithParameters(sql, parameters);
    }
    catch(e){
        console.log("we are in catch of shoppingCart dao");
        console.log(e);
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(product), e);
    }   
    console.log(succefullServerResponse);
    let succefullClosingCart = {
        message: "your cart was closed",
        Status: 200,
        closedId: cartId
    }
    console.log(succefullClosingCart)
    return succefullClosingCart;
}

module.exports = {
    addShoppingCart,
    closeShoppingCart,
};
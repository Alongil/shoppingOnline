let connection = require ("./connection-wrapper");
let ErrorType = require("./../error/error-type");
let ServerError = require("./../error/server-error");
// getting the number of orders in the DB
async function getNumberOfOrders() {
    let sql = "SELECT COUNT(id) AS number FROM orders";
    try {
        numberOfOrders = await connection.execute(sql);
    }
    catch(e){
        console.log(e);
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(products), e);
    }
    console.log(numberOfOrders[0].number);
    // return numberOfOrders[0].number;
    return numberOfOrders[0];
}

// adding an order to the DB
async function addOrder(order) {
    console.log("we are in order dao");
    let sql = "INSERT INTO orders (customer_id, cart_id, final_price, city, street, delivery_date, credit_card_last_four) values(?, ?, ?, ?, ?, ?, ?)";
    let parameters = [order.customerId, order.cartId, order.finalPrice, order.city, order.street, order.deliveryDate, order.lastFourCardDigits];
    try {
        succefullServerResponse = await connection.executeWithParameters(sql, parameters);
    }
    catch(e){
        console.log("we are in catch of addProduct dao");
        console.log(e);
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(product), e);
    }   
    return succefullServerResponse;
}
// getting the order final price from DB 
async function getOrderFinalPrice(cartId){
    console.log("we are in order dao get final price");
    let sql = "select SUM(total_price) as finalPrice from cart_items where cart_id = ?";
    let parameters = [cartId];
    try {
        succefullServerResponse = await connection.executeWithParameters(sql, parameters);
    }
    catch(e){
        console.log("we are in catch of addProduct dao");
        console.log(e);
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(product), e);
    }   
        console.log(succefullServerResponse);
        succefullServerResponse = succefullServerResponse[0];
        console.log("after me im just checking what I need to return");
        console.log(succefullServerResponse.finalPrice)
        return succefullServerResponse.finalPrice;
}
// getting all dates that are not available in the next month(already been taken three times)
async function getUnavailableDates() {
    // creating a variable with today's date
    let today = await formatDate(new Date());
    let sql = "SELECT delivery_date as deliveryDate\
    FROM orders GROUP BY deliveryDate HAVING COUNT(*) > 2\
    and deliveryDate > ?";
    let parameters = [today];
    try {
        // calling the relavent function in the connection file
        unavailableDates = await connection.executeWithParameters(sql, parameters);
    }
    catch(e){
        // console log for tests, reaching here means we have an error connection with the DB
        console.log("we are in catch of addProduct dao");
        console.log(e);
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(product), e);
    }   
    // returning an array of objects with all the non available dates
    return unavailableDates;
} 
// foramting the date to the wanted format
async function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}




module.exports = {
    getNumberOfOrders,
    getUnavailableDates,
    addOrder,
    getOrderFinalPrice
};
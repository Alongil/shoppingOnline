const expressJwt = require('express-jwt');
const config = require('../config.json');

// Extracting the text from the secret's JSON
let { secret } = config;
//console.log(secret);
function authenticateJwtRequestToken() {
    // Load secret into 
    // console.log("this is epressJWT: " + expressJwt({secret}));
    console.log("were in login Filter");
    return expressJwt({ secret }).unless({
        path: [
            // public routes that don't require authentication
            '/users/login',
            '/users/register',
            '/users/forgotPassword',
            '/register/final',
            '/products/update',
            '/products/new',
            '/products/searchproduct/cucumber',
            '/products/number',
            '/orders/number',
            '/carts/add',
            '/carts/updateitem',
            '/carts/items',
            '/carts/deleteItem/id',
            '/shoppingcart/close',
            '/orders/add',
            '/orders/unavailabledates',
            '/orders/unavailabledates',
            '/orders/number',
        ]
    });
}

module.exports = authenticateJwtRequestToken;
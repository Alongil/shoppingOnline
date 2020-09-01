const corse = require("cors");
const express = require("express");
const loginFilter = require("./middleware/login-filter");
const server = express();
let usersController = require("./controllers/users-controller");
let productsController = require("./controllers/products-controller");
let ordersController = require("./controllers/orders-controller");
let cartItemsController = require("./controllers/cart-items-controller");
let shoppingCartController = require("./controllers/shopping-cart-controller");
const errorHandler = require("./error/error-handler");

// enables other domains to connect to my server
server.use(corse());
// Extract the JSON from the body and create request.body object containing it: 
server.use(express.json());
// trasffering to login Filter to check if the token is valid
server.use(loginFilter());

// checking the ending of the url and sending the request to the relavent controller, for further processing
server.use("/users", usersController);
server.use("/products", productsController);
server.use("/orders", ordersController);
server.use("/carts", cartItemsController);
server.use("/shoppingcart", shoppingCartController);

// If we have an error, then the error is being transferred 
// to the errorHandler middleware for further processing
server.use(errorHandler);
server.listen(3000, () => console.log("Listening on http://localhost:3000"));

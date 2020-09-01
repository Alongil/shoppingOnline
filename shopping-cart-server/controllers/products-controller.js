let prodcutsLogic = require("../logic/products-logic");
const express = require("express");
const router = express.Router();
const usersCache = require("../logic/cache-module");

// POST http://localhost:3000/shop/ - getting the cuurent prodcuts
router.get("all", async (request, response, next) => {
    console.log("we are in getProducts");

    try {
        // calling the relavent function in product logic
        products = await prodcutsLogic.getAllProducts();
        // console log section for tests
        console.log("products in products controller:");
        console.log(products);
        console.log("server response in products controller:");
        // sending the response to the client
        response.json(products);
    } 
    catch(error) {
        console.log(erro);
        // calling the error handel with the error we recieves
        return next(error);
        }
    }
); 
// getting all products in the relavent category acording to the id in the parametrs of the request
router.get("/category/:id", async (request, response, next) => {
    // Extracting the JSON from the packet's params
    let categoryId = request.params.id;
    // console log section for tests
    console.log("we are in get products by category and after me is the id");
    console.log(categoryId);

    try {
        // calling the relavent function in product logic
        succefullServerResponse = await prodcutsLogic.getProductsByCategory(categoryId);
        console.log(succefullServerResponse); 
        // sending the response to the client
        response.json(succefullServerResponse);
    }
    catch (error) {
        console.log("Failed to get prodcuts");
        console.log(error);
        // calling the error handler with the error we recieves
        return next(error);
    }
});

// getting all the products the match the name in the request params
router.get("/search/:name", async (request, response, next) => {
    // Extracting the JSON from the packet's BODY and adding th % sign to it matches our sql version
    let productName = "%"+request.params.name+"%";
    // console log for tests
    console.log("we are in get products by name(search) and after me is the id");
    console.log(productName);

    try {

        // calling the relavent function the products controller
        succefullServerResponse = await prodcutsLogic.getProductsByName(productName);
        console.log(succefullServerResponse); 
        // sending the response to the client
        response.json(succefullServerResponse);
    }
    catch (error) {
        console.log("Failed to get prodcuts");
        console.log(error);
        // calling the error handler with the error we recieves
        return next(error);
    }
});
// adding a product to the products table in the DB, only for admin(need to add validation that checks if the user is admin)
router.post("/add", async (request, response, next) => {
    // console log for tests
    console.log("we are in new product");
    // Extracting the JSON from the packet's BODY
        let product = request.body;
        try {
            // calling the relavent function in product controller
            successAddingProduct = await prodcutsLogic.addProduct(product);
            // console log for tests
            console.log("after me is succes adding prodcut"); 
            console.log(successAddingProduct) 
            // sencing the response back to the client
            response.json(successAddingProduct);
        }
        catch (error) {
            console.log("product wasnt added");
            console.log(error);
            // calling the error handel with the error we recieves
            return next(error);
        }
    });
// updating a product, only possible by admin(need to add validation that checks if the user is admin)
router.put("/update", async (request, response, next) => {
    // Extracting the JSON from the packet's BODY
        console.log("we are in admin update product");
        let product = request.body;
        try {
            succefullServerResponse = await prodcutsLogic.updateProduct(product);
            console.log(succefullServerResponse); 
            response.json(succefullServerResponse);
        }
        catch (error) {
            console.log("Failed to UPDATE PRODUCT");
            console.log(error);
            // calling the error handel with the error we recieves
            return next(error);
    }
});  
// getting the number of products available in the website
router.get("/number", async (request, response, next) => {
    // console log for tests
    console.log("we are in get number of Products");

    try {
        // calling the relavent function in product logic
        numberOfProducts = await prodcutsLogic.getNumberOfProducts();
        // console log for tesys
        console.log("number of products in products controller:");
        console.log(numberOfProducts);
        console.log("server response in products controller:");
        // sending the response bacl to the client
        response.json(numberOfProducts);
    } 
    catch(error) {
        // calling the error handel with the error we recieves
        return next(error);
        }
    }
); 

module.exports = router;


let productsDao = require("../dao/products-dao");
let cacheModule = require("./cache-module"); 
const jwt = require("jsonwebtoken");
const config = require("../config.json");
let ErrorType = require("./../error/error-type");
let ServerError = require("./../error/server-error");
const { json } = require("express");

// Getting all the products
async function getAllProducts() {
    let products = await productsDao.getAllProducts();
    console.log(products);;

    return products;
}
// getting all the products from the relavent category
async function getProductsByCategory(categoryId) {
    let products = await productsDao.getProductsByCategory(categoryId);
    console.log("products from get products by category logic: ");
    console.log(products);

    return products;
}
// getting all ptoducts by the relavent name
async function getProductsByName(productName) {
    let products = await productsDao.getProductsByName(productName);
    console.log("products from get products by name logic: ");
    console.log(products);

    return products;
}
// adding a product - only by admin
async function addProduct(product){
    // validation
        if (!validateProduct(product)) {
            return;
        }    
        if(await productsDao.isProductAlreadyExist(product)){
            console.log("product name already exist");
            throw new ServerError (ErrorType.PRODUCT_ALREADY_EXIST); 
        }
        console.log("WE ARE IN LOGIC ADD PRODCUT");
        let successAddingProduct = await productsDao.addProduct(product);

        return successAddingProduct;
    }  
// updating a product - only by admin
async function updateProduct(product) {

    if (!validateProduct(product)) {
        return;
    }       

    if(product.id == null || product.id == "") {
        console.log("product id must be mentioned");
        throw new ServerError (ErrorType.IS_REQUIRED_FIELD); 
    }

   successfullUpdate = await productsDao.updateProduct(product);
   console.log(successfullUpdate);
   return successfullUpdate;
}   
// validating the product that came from the client is valid
function validateProduct(product) {
    if(product.name == null || product.name == ""){
        console.log("product name is required");
        throw new ServerError (ErrorType.IS_REQUIRED_FIELD); 
    } 
    if(product.price == null || product.price == "") {
        console.log("price is required");
        throw new ServerError (ErrorType.IS_REQUIRED_FIELD); 
        
    } 
    if(product.categoryId == null || product.categoryId == ""){
        console.log("category_id is required");
        throw new ServerError (ErrorType.IS_REQUIRED_FIELD); 
    } 
    return true;
}
// getting the number of products in the weibsite
async function getNumberOfProducts() {
    let numberOfProducts = await productsDao.getNumberOfProducts();
    console.log(numberOfProducts);

    return numberOfProducts;
}
// getting the price of the product from the DB
async function getProductPriceById(productId) {
    let productPrice = await productsDao.getProductPriceById(productId)
    return productPrice;
}

// function testAddprodyct() {
//     product = {
//         name: "eggplant",
//         price: "7",
//         category_id: "1"
//     }
//     addProduct(product);
//     }
//     testAddprodyct();

module.exports = {
    getAllProducts,
    getProductsByCategory,
    getProductsByName,
    addProduct,
    updateProduct,
    getNumberOfProducts,
    getProductPriceById
}
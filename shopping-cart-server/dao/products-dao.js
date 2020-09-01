let connection = require ("./connection-wrapper");
let ErrorType = require("./../error/error-type");
let ServerError = require("./../error/server-error");
// getting all the products from the DB
async function getAllProducts() {
    let sql = "select id, product_name as productName, price, img_src as imgSrc, category_id as categoryId from products order by product_name";
    try {
        products = await connection.execute(sql);
    }
    catch(e){
        console.log(e);
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(products), e);
    }
    // if(products == null || products.length == 0) {
    //     // throw new ServerError(ErrorType.GENERAL_ERROR);
    //     throw new ServerError(ErrorType.NO_products_FOUND);
    // }
    console.log(products);
    return products;
}
// getting all the products from the relavent category in the DB
async function getProductsByCategory(categoryId) {
    let sql = "SELECT id, product_name as productName, price, img_src as imgSrc, category_id as categoryId FROM products where category_id = ?";
    let parameters = [categoryId];
    // console.log(category_id)
    let products;
    try {
        products = await connection.executeWithParameters(sql, parameters);
    }
    catch(e){
        console.log(e);
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(products), e);
    }
    // if(products == null || products.length == 0) {
    //     // throw new ServerError(ErrorType.GENERAL_ERROR);
    //     throw new ServerError(ErrorType.NO_products_FOUND);
    // }
    console.log(products);
    return products;
}
// getting the products that match the name (search function)
async function getProductsByName(productName) {
    let sql = "SELECT * FROM products where product_name LIKE ?";
    let parameters = [productName];
    // console.log(category_id)
    let products;
    try {
        products = await connection.executeWithParameters(sql, parameters);
    }
    catch(e){
        console.log(e);
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(products), e);
    }
    if(products == null || products.length == 0) {
        throw new ServerError(ErrorType.GENERAL_ERROR);
    }
    console.log(products);
    return products
}
//adding a product to DB only by admin
async function addProduct(product){
    console.log("we are in addProduct dao");
    let sql = "INSERT INTO products (product_name, price, img_src,category_id) values(?, ?, ?, ?)";
    // parameters to replace the question mark
    let parameters = [product.name, product.price, product.imgSrc,product.categoryId];
    // calling with async to the excecutwithParamets method in the connection module
    try {
    succefullServerResponse = await connection.executeWithParameters(sql, parameters);
    }
    catch(e){
        console.log("we are in catch of addProduct dao");
        console.log(e);
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(product), e);
    }   
    console.log(succefullServerResponse);
    let successAddingProduct = {
        message: "New Product Was added",
        Status: 200,
        name: product.name,
        id: succefullServerResponse.insertId
    }
    console.log(successAddingProduct)
    return successAddingProduct;
}
// updating a product in DB only by admin
async function updateProduct(product){
    let sql = "UPDATE products SET product_name = ?, price= ?, img_src = ?, category_id= ? where id= ?";
    let parameters = [product.name, product.price, product.imgSrc, product.categoryId, product.id];
    let successUpdate;
    try {
        successUpdate = await connection.executeWithParameters(sql, parameters);
    }
    catch(e){
        console.log(e);
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(product), e);
    }
    if(successUpdate.affectedRows == 0) {
        throw new Error('NO MATCHING product TO UPDATE')
    }
    console.log(JSON.stringify(successUpdate));
    return JSON.stringify(successUpdate);

}
// checking if the product already exists
async function isProductAlreadyExist(product) {
    
    let sql = "select id from products where product_name= ?";
    let parameters = [product.name];
    let productId;
    try {
        productId = await connection.executeWithParameters(sql, parameters);
    }
    catch(e) {
        console.log(e);
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(product), e);
    }   
    if (productId == null || productId.length == 0) {
        return false;
    } else {
        console.log(productId);
        return true;
    }
}
// getting the number of products from the DB
async function getNumberOfProducts() {
    let sql = "SELECT COUNT(id) AS number FROM products";
    try {
        numberOfProducts = await connection.execute(sql);
    }
    catch(e){
        console.log(e);
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(products), e);
    }
    // if(products == null || products.length == 0) {
        //     // throw new ServerError(ErrorType.GENERAL_ERROR);
        //     throw new ServerError(ErrorType.NO_products_FOUND);
        // }
    console.log(numberOfProducts[0].number);

    
    // return numberOfProducts[0].number;
    return numberOfProducts[0];
}
// getting the price of product by the relavent id
async function getProductPriceById(productId) {
    let sql = "select price from products where id = ?";

    let parameters = [productId];

    try {
        productPrice = await connection.executeWithParameters(sql, parameters);
    }
    catch(e){
        console.log(e);
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(cartItems), e);
    }

    console.log("after me is product price in cartItemsDaO");
    productPrice = productPrice[0]
    console.log(productPrice.price);

    return productPrice;
}









// function testAddproduct() {
//     prudtcId = 2;
     
//     getProductPriceById(prudtcId);
// }
//     testAddproduct();

module.exports = {
    getAllProducts,
    getProductsByCategory,
    getProductsByName,
    addProduct,
    updateProduct,
    isProductAlreadyExist,
    getNumberOfProducts,
    getProductPriceById
};
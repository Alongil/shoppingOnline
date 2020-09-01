let usersDao = require("../dao/users-dao");
let cacheModule = require("./cache-module"); 
const jwt = require("jsonwebtoken");
const config = require("../config.json");
let ErrorType = require("./../error/error-type");
let ServerError = require("./../error/server-error");
const { json } = require("express");
const RIGHT_SALT = "skdjfskdhfkjshKSJDHFSKJDHFKJSDHFKJS234234";
const LEFT_SALT = "SDLFKGMDSLFKGSDFLKL2342342%#$#$SD;LFKJS234234";
// adding user to DB
async function addUser(user){
// validation of user fields
    if (!validateUser(user)) {
        return;
    }   
    // validating that user isnt already exists 
    if(await usersDao.isEmailOrIdNumberAlreadyExist(user)){
        console.log("user email or id number already exist");
        throw new ServerError (ErrorType.USER_ALREADY_EXIST); 
    }
    console.log("WE ARE IN LOGIC ADD USER");
    successRegistration = await usersDao.addUser(user);
    let userData = {
        idNumber: successRegistration.idNumber,
        name: successRegistration.name
    }
    
    let saltedEmail = LEFT_SALT + user.email + RIGHT_SALT;
    const jwtToken = jwt.sign({ sub: saltedEmail }, config.secret);
    cacheModule.set(jwtToken, userData.idNumber); 
    console.log(userData);
    let SuccessfullRegistrationResponse = {token:jwtToken,userInfo: userData};
    console.log(SuccessfullRegistrationResponse);
    return SuccessfullRegistrationResponse;
}   

// updating a user - only for admin
async function updateUser(user) {
    if (!validateUser(user)) {
        return;
    }       
    if(user.role == "" || user.role == null){
        console.log("role is required");
        throw new ServerError (ErrorType.IS_REQUIRED_FIELD); 
    }
   successfullUpdate = await usersDao.updateUser(user);
   console.log(successfullUpdate);
   return successfullUpdate;
}

// login function
async function login(user) {    
    let userData = await usersDao.login(user);
    // After a successful login, add the following header to each request
    // Authorization: The word Bearer, space (" ") and then - the token.
    // Example : 
    // Authorization : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBdmkiLCJpYXQiOjE1ODU0OTAxMjd9.O01aQaKcEOHgRexVwwX53T_SqMmKBxP3ng2dlriackA
    let saltedEmail = LEFT_SALT + user.email + RIGHT_SALT;
    const jwtToken = jwt.sign({ sub: saltedEmail }, config.secret);
    // console.log("token before adding to cahce: " + jwtToken);
    // console.log("userData before adding to cahce: " + JSON.stringify(userData));
    cacheModule.set(jwtToken, userData.idNumber); 
    // Do something with cache and stuff.. token....
    console.log("after me is all user Data information: ");
    console.log(userData.idNumber);
    console.log(userData.role);
    userData.token = jwtToken;
    console.log("user Data after adding the token");
    console.log(userData);
    // only if the user has an order format the order date
    if(userData.lastOrderDate){
        // setting the last order date to be in a europien format
        userData.lastOrderDate = await formatDate(userData.lastOrderDate);
        console.log(userData.lastOrderDate);
    }
    return userData;
}

// validating user
function validateUser(user) {
    if(user.name == null || user.name == ""){
        // ErrorType.IS_REQUIRED_FIELD.message = "user name is required"
        console.log("name is required");
        throw new ServerError (ErrorType.IS_REQUIRED_FIELD); 
    } 
    if(user.familyName == null || user.familyName == "") {
        console.log("family name is required");
        throw new ServerError (ErrorType.IS_REQUIRED_FIELD); 
        
    } 
    if(user.idNumber == null || user.idNumber == ""){
        console.log("Id number is required");
        throw new ServerError (ErrorType.IS_REQUIRED_FIELD); 
        
    } 
    if(user.password == null || user.password == ""){
        console.log("password is required");
        throw new ServerError (ErrorType.IS_REQUIRED_FIELD); 
    }
    if(user.city == null || user.city == ""){
        console.log("city is required");
        throw new ServerError (ErrorType.IS_REQUIRED_FIELD); 
        
    }
    if(user.street == null || user.street == ""){
        console.log("street is required");
        throw new ServerError (ErrorType.IS_REQUIRED_FIELD); 

    } 
    if(user.email == null || user.email == "" ){
        console.log("email is required");
        throw new ServerError (ErrorType.IS_REQUIRED_FIELD); 
    } 
    return true;
}

// getting the current user
async function getUser(idNumber) {
   user = await usersDao.getUser(idNumber)
   return user;
}

// checking if user already exists
async function isEmailOrIdNumberAlreadyExist(user){
    // validation
    if(user.idNumber == null || user.idNumber == ""){
        console.log("Id number is required");
        throw new ServerError (ErrorType.IS_REQUIRED_FIELD); 
    } 

    if(user.email == null || user.email == "" ){
        console.log("email is required");
        throw new ServerError (ErrorType.IS_REQUIRED_FIELD); 
    } 

    if(user.password == null || user.password == ""){
        console.log("password is required");
        throw new ServerError (ErrorType.IS_REQUIRED_FIELD); 
    }   
    
    if(await usersDao.isEmailOrIdNumberAlreadyExist(user)){
        console.log("user email or id number already exist");
        throw new ServerError (ErrorType.USER_ALREADY_EXIST); 
    }
       console.log("all registartion fields are valid")
        return false;
} 

// formating the date to the wanted pattern
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

    // function testAddUser() {
    //     // user = { name: "Yopo", family_name: "Gilad", password: "Ag1741991", city: "Tel-Aviv", street:"sdfsdf", email: "test25.com", idNumber:"230984092384"};
    //     login(user);
    //     }
    //     testAddUser();





module.exports = {
    addUser,
    updateUser,
    getUser,
    isEmailOrIdNumberAlreadyExist,
    // deleteUser,
    // changePassword,
    login,
}
let connection = require ("./connection-wrapper");
let ErrorType = require("./../error/error-type");
let ServerError = require("./../error/server-error");
const { NULL } = require("mysql2/lib/constants/types");

// adding a user to DB 
async function addUser(user){
    // sql query 
    console.log("we are in addUser dao");
    let sql = "INSERT INTO users (name, family_name, id_number, password, city, street, email, role) values(?, ?, ?, ?, ?, ?, ?, 'customer')";
    // parameters to replace the question mark
    let parameters = [user.name, user.familyName, user.idNumber,user.password, user.city, user.street, user.email];
    // calling with async to the excecutwithParamets method in the connection module
    try {
    succefullServerResponse = await connection.executeWithParameters(sql, parameters);
    }
    catch(e){
        console.log("we are in catch of addUser dao");
        console.log(e);
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(user), e);
    }   
    console.log(succefullServerResponse);
    let successRegistration = {
        message: "New User Was added",
        Status: 200,
        name: user.name,
        idNumber: user.idNumber
    }
    return successRegistration;
}
// updating a user
async function updateUser(user) {
    // הסדר בפרמטרים של 2 השורות הבאות חייב להיות זהה
    let sql = "UPDATE users SET name = ?, family_name= ?, password = ?, city= ?, street= ?, email= ?, role = ? where id_number= ? ";
    let parameters = [user.name, user.familyName, user.password, user.city, user.street, user.email, user.role, user.idNumber];
    let successUpdate;
    try {
        successUpdate = await connection.executeWithParameters(sql, parameters);
    }
    catch(e){
        console.log(e);
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(user), e);
    }
    if(successUpdate.affectedRows == 0) {
        throw new Error('NO MATCHING USER TO UPDATE')
    }
    console.log(successUpdate);
    return JSON.stringify(successUpdate);
}
// getting a user form DB
async function getUser(idNumber) {
    let sql = "select id, name, family_name as familyName, id_number as idNumber, password, city, street, email, role from users where id_number=?";
    let parameters = [idNumber];
    let user;
    try {
        user = await connection.executeWithParameters(sql, parameters);
    }
    catch(e){
        console.log(e);
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(user), e);
    }
    if(user == null || user.length == 0) {
        // throw new ServerError(ErrorType.GENERAL_ERROR);
        throw new ServerError(ErrorType.NO_USER_FOUND);
    }
    console.log(user);
    return user;
}
//deleting a user from DB
async function deleteUser(idNumber) {
    let sql = "delete from users where id_number=?";
    let parameters = [idNumber];
    let successfullDeleteFromDb;
    try {
        successfullDeleteFromDb =  await connection.executeWithParameters(sql, parameters);
        console.log(JSON.stringify(successfullDeleteFromDb) + "user has been succefully deleted");
        return successfullDeleteFromDb + " user has been successfully deleted";
    }
    catch(e){
        console.log(e);
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(user), e);
    }
    
}
// changing the user's password
async function changePassword(user) { 
    let sql = "UPDATE users SET password = ? where id_number=?";
    let parameters = [user.password, user.idNumber];
    let successPasswordUpdate;
    try {
        successPasswordUpdate = await connection.executeWithParameters(sql, parameters);
        console.log(JSON.stringify(successPasswordUpdate) + "password changed");
        return successPasswordUpdate + "Password has been updated";
    }   
    catch(e) {
       console.log(e);
       throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(user), e);
    }
}
// cheking if the email of id number already exists
async function isEmailOrIdNumberAlreadyExist(user) {

    let sql = "select id from users where email= ? OR id_number= ?";
    let parameters = [user.email, user.idNumber];
    let userId;
    try {
        userId = await connection.executeWithParameters(sql, parameters);
    }
    catch(e) {
        console.log(e);
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(user), e);
    }   
    if (userId == null || userId.length == 0) {
        // console.log(userId);
        return false;
    } else {
        console.log(userId);
        return true;
    }
}

// login function
async function login(user) {

    let sql = "select name, family_name as familyName, id_number as idNumber, u.city, u.street, email, role, created_date as cartCreatedDate,\
    sum(ci.total_price) as cartCurrentPrice, cart_id as cartId\
    from users u\
    left join shopping_cart s on u.id_number = s.user_id\
    and s.isCheckedOut = 'false'\
    left join cart_items ci on s.id = ci.cart_id\
    where u.email = ? and u.password = ?"

    let parameters = [user.email, user.password];
    let usersLoginResult;
    try {
        usersLoginResult = await connection.executeWithParameters(sql, parameters);
        usersLoginResult = usersLoginResult[0];
        usersLoginResult.lastOrderDate = null;
        console.log(usersLoginResult);
    }
    catch (e) {
        // that  error  threw an exception - WHICH WE WANT TO WRAP with a ServerError
        console.log("this is catch block");
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(user), e);
    }

    if (usersLoginResult.idNumber == null || usersLoginResult.length == 0) {
        // console.log(usersLoginResult);
        console.log("if you run the whole server there will be an error")
        throw new ServerError(ErrorType.UNAUTHORIZED);                                   
        }
    
    if(usersLoginResult.cartId == null)  {
        let sql = "select date_when_order_created as lastOrderDate from orders where customer_id = ?\
        order by id desc limit 1"
        let parameters = [usersLoginResult.idNumber];

        dateOfLastOrder = await connection.executeWithParameters(sql, parameters);
        console.log("we are in cartId null ")
        console.log(dateOfLastOrder);
        
        if(dateOfLastOrder[0] == null || dateOfLastOrder[0] == undefined){
            console.log("user in cartId null")
            console.log(usersLoginResult)
            return usersLoginResult;
        }

        dateOfLastOrder = dateOfLastOrder[0];
        usersLoginResult.lastOrderDate = dateOfLastOrder.lastOrderDate 
        console.log(usersLoginResult);
        return usersLoginResult;
    }  
    console.log("All good !"); 
    console.log(usersLoginResult); 

    return usersLoginResult;
}

// function testAddUser() {
//     user = { name: "Yopo", family_name: "Gilad", password: "Ag1741991", city: "Tel-Aviv", street:"sdfsdf", email: "test23.com", id_number:"230984092384"};
//     login(user);
//     }
//     testAddUser();

module.exports = {
    addUser,
    updateUser,
    getUser,
    deleteUser,
    changePassword,
    isEmailOrIdNumberAlreadyExist,
    login
};

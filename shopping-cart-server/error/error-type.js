let ErrorType = {
    
    GENERAL_ERROR : {id: 1, httpCode: 600, message : "Ops...something went wrong", isShowStackTrace: true},
    USER_ALREADY_EXIST : {id: 2, httpCode: 401, message : "User email or id number already exist", isShowStackTrace: true},
    UNAUTHORIZED : {id: 3, httpCode: 401, message : "Login failed, please check that email and passwrod are correct", isShowStackTrace: true},
    NO_USER_FOUND: {id: 4, httpCode: 601, message : "There are no matching users", isShowStackTrace: true},
    IS_REQUIRED_FIELD: {id: 5, httpCode: 422, message : "All fields are required", isShowStackTrace: true},
    UNAUTHORIZED_TOKEN: {id: 6, httpCode: 401, message : "Your session has expired please login", isShowStackTrace: true},
    NO_MATCHING_RESULTS: {id: 7, httpCode: 501, message : "No Mathcing results to your search", isShowStackTrace: true},
    PRODUCT_ALREADY_EXIST: {id: 8, httpCode: 501, message : "product name already exist", isShowStackTrace: true},
    DELIVERY_DATE_TAKEN: {id: 9, httpCode: 422, message : "sorry, delivery date is already taken", isShowStackTrace: true},
    ORDER_PRICE_DONT_MATCH: {id: 10, httpCode: 422, message : "probably a price update, please verify order price final amount", isShowStackTrace: true},
}

module.exports = ErrorType;
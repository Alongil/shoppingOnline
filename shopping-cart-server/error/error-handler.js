const ServerError = require("./server-error");

let errorHandler = (e, request, response, next) => {
    // e = my Server error --> IT HAS AN ENUM INSIDE (!!) called errorType
    if (e.errorType != undefined && e.errorType.isShowStackTrace) {
        console.error(e);
        response.status(e.errorType.httpCode).json({ error: e.errorType.message });
        return;
    }
    if(e.code = 'invalid_token'){
        console.log(e);
        // throw new ServerError (errorType.UNAUTHORIZED_TOKEN.httpCode); 
        response.status(e.status).json({ error: e.message });
    }
    console.log(e)
    response.status(700).json({ error: "General error" });
}

module.exports = errorHandler;
const ClientError = require("./ClientError");

class AuthError extends ClientError {
    constructor(message){
        super(message, 401)
        this.name = 'AuthError'
    }
}

module.exports = AuthError
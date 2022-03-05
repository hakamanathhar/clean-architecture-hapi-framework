class AuthRepository {
    
    async addToken(token){
        throw new Error('AUTH_REPOSITORY.METHOD_NOT_IMPLEMENTED')
    }

    async checkAvailabilityToken(token){
        throw new Error('AUTH_REPOSITORY.METHOD_NOT_IMPLEMENTED')
    }

    async deleteToken(token){
        throw new Error('AUTH_REPOSITORY.METHOD_NOT_IMPLEMENTED')
    }

}

module.exports = AuthRepository
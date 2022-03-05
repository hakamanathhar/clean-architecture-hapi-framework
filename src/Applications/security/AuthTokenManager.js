class AuthTokenManager {
    async createRefreshToken(payload) {
        throw new Error('AUTH_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED')
    }
    async createAccessToken(payload) {
        throw new Error('AUTH_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED')
    }
    async verifyRefreshToken(payload) {
        throw new Error('AUTH_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED')
    }
    async decodedPayload(payload) {
        throw new Error('AUTH_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED')
    }
}
module.exports = AuthTokenManager
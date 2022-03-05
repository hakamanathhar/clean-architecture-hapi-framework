const AuthTokenManager = require("../../Applications/security/AuthTokenManager")
const InvariantError = require("../../Commons/exceptions/InvariantError")

class JwtTokenManager extends AuthTokenManager {
    constructor(jwt) {
        super()
        this._jwt = jwt
    }

    async createAccessToken(payload) {
        return this._jwt.generate(payload, process.env.ACCESS_TOKEN_KEY)
    }

    async createRefreshToken(payload) {
        return this._jwt.generate(payload, process.env.REFRESH_TOKEN_KEY)
    }

    async verifyRefreshToken(token) {
        try {
            const artifacts = this._jwt.decode(token)
            this._jwt.verify(artifacts, process.env.REFRESH_TOKEN_KEY)
        } catch (error) {
            throw new InvariantError('refresh token tidak valid')
        }
    }

    async decodePayload(token) {
        const artifacts = this._jwt.decode(token)
        return artifacts.decoded.payload
    }

}

module.exports = JwtTokenManager
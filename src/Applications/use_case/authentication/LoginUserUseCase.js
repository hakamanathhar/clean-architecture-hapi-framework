const NewAuth = require("../../../Domains/authentications/entities/NewAuth")
const UserLogin = require("../../../Domains/users/entities/UserLogin")

class LoginUserUseCase {
    constructor({
        userRepository,
        authRepository,
        authTokenManager,
        passwordHash
    }) {
        this._userRepository = userRepository
        this._authRepository = authRepository
        this._authTokenManager = authTokenManager
        this._passwordHash = passwordHash
    }

    async execute(useCasePayload){
        const { username, password } = new UserLogin(useCasePayload)
        const encryptedPassword = await this._userRepository.getPasswordByUsername(username)
        await this._passwordHash.comparePassword(password, encryptedPassword)
        const id = await this._userRepository.getIdByUsername(username)
        const accessToken = await this._authTokenManager.createAccessToken({ username, id})
        const refreshToken = await this._authTokenManager.createRefreshToken({ username, id})
        const newAuth = new NewAuth({
            accessToken,
            refreshToken,
        })
        await this._authRepository.addToken(newAuth.refreshToken)
        return newAuth
    }
}

module.exports = LoginUserUseCase
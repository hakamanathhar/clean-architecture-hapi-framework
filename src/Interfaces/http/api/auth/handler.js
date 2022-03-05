const LoginUserUseCase = require("../../../../Applications/use_case/authentication/LoginUserUseCase")
const LogoutUserUseCase = require("../../../../Applications/use_case/authentication/LogoutUserUseCase")

class AuthHandler {
    constructor(container){
        this._container = container

        this.postAuthHandler = this.postAuthHandler.bind(this)
        this.putAuthHandler = this.putAuthHandler.bind(this)
        this.deleteAuthHandler = this.deleteAuthHandler.bind(this)
    }

    async postAuthHandler(request, h){
        console.log(request)
        const loginUserUseCase = this._container.getInstance(LoginUserUseCase.name)
        const { accessToken, refreshToken } = await loginUserUseCase.execute(request.payload)
        const response = h.response({
            status: 'success',
            data: {
                accessToken,
                refreshToken
            },
        })
        response.code(201)
        return response
    }

    async putAuthHandler(request) {
        const refreshAuthUseCase = this._container.getInstance(RefreshAuthUseCase.name)
        const accessToken = await refreshAuthUseCase.execute(request.payload)

        return {
            status: 'success',
            data: {
                accessToken,
            },  
        }
    }

    async deleteAuthHandler(request){
        const logoutUserUseCase = this._container.getInstance(LogoutUserUseCase.name)
        await logoutUserUseCase.execute(request.payload)
        return {
            status: 'success'
        }
    }
}

module.exports = AuthHandler
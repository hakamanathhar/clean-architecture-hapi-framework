class RefreshAuthUseCase {
    constructor({
        authRepository,
        authTokenManager
    }) {
        this._authRepository = authRepository
        this._authTokenManager = authTokenManager
    }

    async execute(useCasePayload) {
        this._verifyPayload(useCasePayload)
        const { refreshToken } = useCasePayload
        await this._authTokenManager.verifyRefreshToken(refreshToken)
        await this._authRepository.checkAvailabilityToken(refreshToken)

        const { username, id } = await this._authTokenManager.decodePayload(refreshToken)
        return this._authTokenManager.createAccessToken({ username, id })
    }

    _verifyPayload(payload){
        const { refreshToken } = payload
        if(!refreshToken){
            throw new Error('REFRESH_AUTH_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN')
        }

        if(typeof refreshToken !== 'string'){
            throw new Error('REFRESH_AUTH_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION')
        }
    }
}

module.exports = RefreshAuthUseCase
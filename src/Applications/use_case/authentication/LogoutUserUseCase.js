class LogoutUserUseCase {
    constructor({
        authRepository
    }) {
        this._authRepository = authRepository
    }

    async execute(useCasePayload) {
        this._validatePayload(useCasePayload)
        const { refreshToken } = useCasePayload
        await this._authRepository.checkAvailabilityToken(refreshToken)
        await this._authRepository.deleteToken(refreshToken)
    }

    _validatePayload(payload){
        const { refreshToken } = payload
        if(!refreshToken) {
            throw new Error('DELETE_AUTH_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN')
        }

        if(typeof refreshToken !== 'string'){
            throw new Error('DELETE_AUTH_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION')
        }
    }
}

module.exports = LogoutUserUseCase
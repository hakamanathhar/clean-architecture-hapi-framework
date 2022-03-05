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
        //Terakhir
        const { username, password } = new Usr
    }
}
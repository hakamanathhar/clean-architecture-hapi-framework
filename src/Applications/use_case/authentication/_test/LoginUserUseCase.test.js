const AuthRepository = require('../../../../Domains/authentications/AuthRepository')
const UserRepository = require('../../../../Domains/users/UserRepository')
const AuthTokenManager = require('../../../security/AuthTokenManager')
const PasswordHash = require('../../../security/PasswordHash')
const LoginUserUseCase = require('../LoginUserUseCase')

describe('GetAuthenticationUseCase', () => {
    it('should orchestrating the get authentication action correctly', async () => {
        // Arrange
        const useCasePayload = {
            username: 'hakaman',
            password: 'secret'
        }

        const expectedAuthentication = {
            accessToken: 'access_token',
            refreshToken: 'refresh_token',
        }

        const mockUserRepository = new UserRepository()
        const mockAuthRepository = new AuthRepository()
        const mockAuthTokenManager = new AuthTokenManager()
        const mockPasswordHash = new PasswordHash()

        // Mocking
        mockUserRepository.getPasswordByUsername = jest.fn()
        .mockImplementation(() => Promise.resolve('encrypted_password'))
        mockPasswordHash.comparePassword = jest.fn()
        .mockImplementation(() => Promise.resolve())
        mockAuthTokenManager.createAccessToken = jest.fn()
        .mockImplementation(() => Promise.resolve(expectedAuthentication.accessToken))
        mockAuthTokenManager.createRefreshToken = jest.fn()
        .mockImplementation(() => Promise.resolve(expectedAuthentication.refreshToken))
        mockUserRepository.getIdByUsername = jest.fn()
        .mockImplementation(() => Promise.resolve('user-123'))
        mockAuthRepository.addToken = jest.fn()
        .mockImplementation(() => Promise.resolve())

        // Create use case instance
        const loginUserUseCase = new LoginUserUseCase({
            userRepository: mockUserRepository,
            authRepository: mockAuthRepository,
            authTokenManager: mockAuthTokenManager,
            passwordHash: mockPasswordHash,
        })

        // Action
        const actualAuth = await loginUserUseCase.execute(useCasePayload)

        // Assert
        expect(actualAuth).toEqual(expectedAuthentication)
        expect(mockUserRepository.getPasswordByUsername).toBeCalledWith('hakaman')
        expect(mockPasswordHash.comparePassword).toBeCalledWith('secret', 'encrypted_password')
        expect(mockUserRepository.getIdByUsername).toBeCalledWith('hakaman')
        expect(mockAuthTokenManager.createAccessToken).toBeCalledWith({username: 'hakaman', id: 'user-123'})
        expect(mockAuthTokenManager.createRefreshToken).toBeCalledWith({username: 'hakaman', id: 'user-123'})
        expect(mockAuthRepository.addToken).toBeCalledWith(expectedAuthentication.refreshToken)

    })
})
const AuthRepository = require("../../../../Domains/authentications/AuthRepository")
const AuthTokenManager = require("../../../security/AuthTokenManager")
const RefreshAuthUseCase = require("../RefreshAuthUseCase")

describe('RefreshAuthUseCase', () => {
    it('should throw error if use case payload not contain refresh token', async () => {
        // Arrange
        const useCasePayload = {}
        const refreshAuthUseCase = new RefreshAuthUseCase({})

        // Action & Assert
        await expect(refreshAuthUseCase.execute(useCasePayload))
        .rejects
        .toThrowError('REFRESH_AUTH_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN')
    })

    it('should throw error if refresh token not string', async () => {
        // Arrange
        const useCasePayload = {
            refreshToken: 1
        }
        const refreshAuthUseCase = new RefreshAuthUseCase({})

        // Action & Assert
        await expect(refreshAuthUseCase.execute(useCasePayload))
        .rejects
        .toThrowError('REFRESH_AUTH_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION')
    })

    it('should orchestrating the refresh authentication action correctly', async () =>{
        // Arrange
        const useCasePayload = {
            refreshToken: 'refreshToken'
        }
        const mockAuthRepository = new AuthRepository()
        const mockAuthTokenManager = new AuthTokenManager()
        // Mocking
        mockAuthRepository.checkAvailabilityToken = jest.fn()
        .mockImplementation(() => Promise.resolve())
        mockAuthTokenManager.verifyRefreshToken = jest.fn()
        .mockImplementation(() => Promise.resolve())
        mockAuthTokenManager.decodedPayload = jest.fn()
        .mockImplementation(() => Promise.resolve({ username: 'hakaman', id: 'user-123'}))
        mockAuthTokenManager.createAccessToken = jest.fn()
        .mockImplementation(() => Promise.resolve('some_new_access_token'))

        // Create the use case instance
        const refreshAuthUseCase = new RefreshAuthUseCase({
            authRepository: mockAuthRepository,
            authTokenManager: mockAuthTokenManager
        })

        // Action
        const accessToken = await refreshAuthUseCase.execute(useCasePayload)

        // Assert
        expect(mockAuthTokenManager.verifyRefreshToken).toBeCalledWith(useCasePayload.refreshToken)
        expect(mockAuthRepository.checkAvailabilityToken).toBeCalledWith(useCasePayload.refreshToken)
        expect(mockAuthTokenManager.decodedPayload).toBeCalledWith(useCasePayload.refreshToken)
        expect(mockAuthTokenManager.createAccessToken).toBeCalledWith({ username: 'hakaman', id: 'user-123'})
        expect(accessToken).toEqual('some_new_access_token')
    })
})
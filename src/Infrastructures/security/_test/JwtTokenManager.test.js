const JwtTokenManager = require("../JwtTokenManager")
const Jwt = require('@hapi/jwt')
const InvariantError = require("../../../Commons/exceptions/InvariantError")

describe('JwtTokenManager', () => {
    describe('createAccessToken function', () => {
        it('should create accessToken correctly', async () => {
            // Arrange
            const payload = {
                username: 'hakaman'
            }
            const mockJwtToken = {
                generate: jest.fn().mockImplementation(() => 'mock_token'),
            }
            const jwtTokenmanager = new JwtTokenManager(mockJwtToken)

            // Action
            const accessToken = await jwtTokenmanager.createAccessToken(payload)

            // Assert
            expect(mockJwtToken.generate).toBeCalledWith(payload, process.env.ACCESS_TOKEN_KEY)
            expect(accessToken).toEqual('mock_token')
        })

    })

    describe('createRefreshToken', () => {
        it('should create refreshToken correctly', async () => {
            // Arrange
            const payload = {
                username: 'hakaman'
            }

            const mockJwtToken = {
                generate: jest.fn().mockImplementation(() => 'mock_token'),
            }
            const jwtTokenManager = new JwtTokenManager(mockJwtToken)

            // Action
            const refreshToken = await jwtTokenManager.createRefreshToken(payload)

            // Assert
            expect(mockJwtToken.generate).toBeCalledWith(payload, process.env.REFRESH_TOKEN_KEY)
            expect(refreshToken).toEqual('mock_token')
        })
    })

    describe('verifyRefreshToken function', () => {
        it('should throw InvariantError when verification failed', async () => {
            // Arrange
            const jwtTokenManager = new JwtTokenManager(Jwt.token);
            const accessToken = await jwtTokenManager.createAccessToken({ username: 'dicoding' });

            // Action & Assert
            await expect(jwtTokenManager.verifyRefreshToken(accessToken))
                .rejects
                .toThrow(InvariantError);

        })

        it('should not throw InvariantError when refresh token verified', async () => {
            // Arrange
            const jwtTokenManager = new JwtTokenManager(Jwt.token);
            const refreshToken = await jwtTokenManager.createRefreshToken({ username: 'dicoding' });
      
            // Action & Assert
            await expect(jwtTokenManager.verifyRefreshToken(refreshToken))
              .resolves
              .not.toThrow(InvariantError);
          });
    })

    describe('decodedPayload function', () => {
        it('should decode payload correctly', async () =>{
            // Arrange
            const jwtTokenManager = new JwtTokenManager(Jwt.token)
            const accessToken = await jwtTokenManager.createAccessToken({ username: 'hakaman' })

            // Action
            const { username: expectedUsername } = await jwtTokenManager.decodePayload(accessToken)

            // Assert
            expect(expectedUsername).toEqual('hakaman')
        })
    })
})
const AuthRepository = require('../AuthRepository')

describe('AuthRepository interface', () => {
    it('should throw error when invoke unimplemented method', async ()=>{
        // Arrange
        const authRepository = new AuthRepository()

        await expect(authRepository.addToken('')).rejects.toThrowError('AUTH_REPOSITORY.METHOD_NOT_IMPLEMENTED')
        await expect(authRepository.checkAvailabilityToken('')).rejects.toThrowError('AUTH_REPOSITORY.METHOD_NOT_IMPLEMENTED')
        await expect(authRepository.deleteToken('')).rejects.toThrowError('AUTH_REPOSITORY.METHOD_NOT_IMPLEMENTED')
    })
})
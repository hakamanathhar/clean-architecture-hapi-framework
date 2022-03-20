const AddThread = require("../../../../Domains/threads/entities/AddThread")
const ThreadRepository = require("../../../../Domains/threads/ThreadRepository")
const AuthTokenManager = require("../../../security/AuthTokenManager")
const AddThreadUseCase = require("../AddThreadUseCase")

 describe('AddThreadUseCase', () => {
    it('should throw error if use case payload not contain access token', async () => {
        // Arrange
        const useCasePayload = {
            payload: {
                title: 'AddThread Pertama',
                body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                owner: 'user-123',
                username: 'hakaman',
            },
            headers: {},
        }
        const getThreadUseCase = new AddThreadUseCase({})

        // Action & Assert
        await expect(getThreadUseCase.execute(useCasePayload))
        .rejects
        .toThrowError('ADD_THREAD_USE_CASE.NOT_CONTAIN_TOKEN')
    })

    it('should throw error if access token not string', async () => {
        // Arrange
        const useCasePayload = {
            payload: {
                title: 'AddThread Pertama',
                body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                owner: 'user-123',
                username: 'hakaman',
            },
            headers: {
                authorization : true,
            },
        }
        const getThreadUseCase = new AddThreadUseCase({})

        // Action & Assert
        await expect(getThreadUseCase.execute(useCasePayload))
        .rejects
        .toThrowError('ADD_THREAD_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION')
    })

    it('should orchestrating the add thread action correctly', async () => {
        // Arrange
        const useCasePayload = {
           payload: {
                title: 'AddThread Pertama',
                body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
           },
           headers: {
               authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imhha2FtYW4iLCJpZCI6InVzZXItWThnUlI2cGM4am9rWlR1RTN2Q0NfIiwiaWF0IjoxNjQ3NDAzOTkxfQ.gt_1RfElpdQgE_eRjbRrFt-EQxxbb-19sQKxGtU9o40'
           },
        }
        const expectedThread = new AddThread({
            title: useCasePayload.payload.title,
            body: useCasePayload.payload.body,
            owner: 'user-123',
            username: 'hakaman'
        })
    
        /** creating dependency of use case */
        const mockThreadRepository = new ThreadRepository()
        const mockAuthTokenManager = new AuthTokenManager()
    
        /** mocking needed function */
        mockThreadRepository.addThread = jest.fn()
        .mockImplementation(() => Promise.resolve(expectedThread))
        mockAuthTokenManager.verifyAccessToken = jest.fn()
        .mockImplementation(() => Promise.resolve(useCasePayload.headers.authorization))
        mockAuthTokenManager.decodePayload = jest.fn()
        .mockImplementation(() => Promise.resolve(useCasePayload.headers.authorization))
    
        /** creating use case instance */
        const getThreadUseCase = new AddThreadUseCase({
            threadRepository: mockThreadRepository,
            authTokenManager: mockAuthTokenManager,
        })
    
        // Action
        const thread = await getThreadUseCase.execute(useCasePayload)
    
        // Assert
        // expect(thread).toStrictEqual(expectedThread)
        // expect(mockAuthTokenManager.verifyRefreshToken).toBeCalledWith(useCasePayload.headers.authorization)
        // expect(mockThreadRepository.addThread).toBeCalledWith(new AddThread({
        //     title: useCasePayload.payload.title,
        //     body: useCasePayload.payload.body,
        //     owner: useCasePayload.payload.owner,
        //     username: useCasePayload.payload.username,
        // }))
    })
})
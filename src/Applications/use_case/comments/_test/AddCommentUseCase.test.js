const AddComment = require("../../../../Domains/comments/entities/AddComment")
const CommentRepository = require("../../../../Domains/comments/CommentRepository")
const AuthTokenManager = require("../../../security/AuthTokenManager")
const AddCommentUseCase = require("../AddCommentUseCase")

 describe('AddCommentUseCase', () => {
    it('should throw error if use case payload not contain access token', async () => {
        // Arrange
        const useCasePayload = {
            payload: {
                content: 'Keren',
                threadId: 'thread-123',
                owner: 'user-123',
                username: 'hakaman',
            },
            headers: {},
        }
        const getCommentUseCase = new AddCommentUseCase({})

        // Action & Assert
        await expect(getCommentUseCase.execute(useCasePayload))
        .rejects
        .toThrowError('ADD_COMMENT_USE_CASE.NOT_CONTAIN_TOKEN')
    })

    it('should throw error if access token not string', async () => {
        // Arrange
        const useCasePayload = {
            payload: {
                content: 'Keren',
                threadId: 'thread-123',
                owner: 'user-123',
                username: 'hakaman',
            },
            headers: {
                authorization : true,
            },
        }
        const getCommentUseCase = new AddCommentUseCase({})

        // Action & Assert
        await expect(getCommentUseCase.execute(useCasePayload))
        .rejects
        .toThrowError('ADD_COMMENT_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION')
    })

    it('should orchestrating the add comment action correctly', async () => {
        // Arrange
        const useCasePayload = {
           payload: {
                content: 'Keren',
                threadId: 'thread-123',
                owner: 'user-123',
                username: 'hakaman',
           },
           headers: {
               authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imhha2FtYW4iLCJpZCI6InVzZXItWThnUlI2cGM4am9rWlR1RTN2Q0NfIiwiaWF0IjoxNjQ3NDAzOTkxfQ.gt_1RfElpdQgE_eRjbRrFt-EQxxbb-19sQKxGtU9o40'
           },
        }
        const expectedComment = new AddComment({
            content: 'Keren',
            threadId: 'thread-123',
            owner: 'user-123',
            username: 'hakaman',
        })
    
        /** creating dependency of use case */
        const mockCommentRepository = new CommentRepository()
        const mockAuthTokenManager = new AuthTokenManager()
    
        /** mocking needed function */
        mockCommentRepository.addComment = jest.fn()
        .mockImplementation(() => Promise.resolve(expectedComment))
        mockAuthTokenManager.verifyAccessToken = jest.fn()
        .mockImplementation(() => Promise.resolve(useCasePayload.headers.authorization))
        mockAuthTokenManager.decodePayload = jest.fn()
        .mockImplementation(() => Promise.resolve(useCasePayload.headers.authorization))
    
        /** creating use case instance */
        const getCommentUseCase = new AddCommentUseCase({
            commentRepository: mockCommentRepository,
            authTokenManager: mockAuthTokenManager,
        })
    
        // Action
        const thread = await getCommentUseCase.execute(useCasePayload)
    
        // Assert
        // expect(thread).toStrictEqual(expectedComment)
        // expect(mockAuthTokenManager.verifyRefreshToken).toBeCalledWith(useCasePayload.headers.authorization)
        // expect(mockCommentRepository.addComment).toBeCalledWith(new AddComment({
        //     title: useCasePayload.payload.title,
        //     body: useCasePayload.payload.body,
        //     owner: useCasePayload.payload.owner,
        //     username: useCasePayload.payload.username,
        // }))
    })
})
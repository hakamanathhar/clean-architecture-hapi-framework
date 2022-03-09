const Thread = require("../../../../Domains/threads/entities/Thread");
const ThreadRepository = require("../../../../Domains/threads/ThreadRepository");
const AuthTokenManager = require("../../../security/AuthTokenManager");
const AddThreadUseCase = require("../AddThreadUseCase");

 describe('AddThreadUseCase', () => {
    it('should throw error if use case payload not contain refresh token', async () => {
        // Arrange
        const useCasePayload = {}
        const getThreadUseCase = new AddThreadUseCase({});

        // Action & Assert
        await expect(getThreadUseCase.execute(useCasePayload))
        .rejects
        .toThrowError('ADD_THREAD_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN')
    })

    it('should throw error if refresh token not string', async () => {
        // Arrange
        const useCasePayload = {
            refreshToken: 1,
        };
        const getThreadUseCase = new AddThreadUseCase({});

        // Action & Assert
        await expect(getThreadUseCase.execute(useCasePayload))
        .rejects
        .toThrowError('ADD_THREAD_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION')
    })

    it('should orchestrating the add user action correctly', async () => {
        const date = new Date();
        const dateFormat = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
        const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        const dateTime = `${dateFormat} ${time}`;

        // Arrange
        const useCasePayload = {
            content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            images: 'images1.jpg',
            createdBy: 'user-kIb7RsEyKODmRoFT22FSR',
            createdAt: dateTime,
            refreshToken: 'refreshToken',
        };
        
        const expectedThread = new Thread({
            content: useCasePayload.content,
            images: useCasePayload.images,
            createdBy: useCasePayload.createdBy,
            createdAt: useCasePayload.createdAt,
            refreshToken: useCasePayload.refreshToken,
        });
    
        /** creating dependency of use case */
        const mockThreadRepository = new ThreadRepository();
        const mockAuthTokenManager = new AuthTokenManager();
    
        /** mocking needed function */
        mockThreadRepository.addThread = jest.fn()
        .mockImplementation(() => Promise.resolve(expectedThread));
        mockAuthTokenManager.verifyRefreshToken = jest.fn()
        .mockImplementation(() => Promise.resolve(useCasePayload.refreshToken));
    
        /** creating use case instance */
        const getThreadUseCase = new AddThreadUseCase({
            threadRepository: mockThreadRepository,
            authTokenManager: mockAuthTokenManager,
        });
    
        // Action
        const thread = await getThreadUseCase.execute(useCasePayload);
    
        // Assert
        expect(thread).toStrictEqual(expectedThread);
        expect(mockAuthTokenManager.verifyRefreshToken).toBeCalledWith(useCasePayload.refreshToken);
        expect(mockThreadRepository.addThread).toBeCalledWith(new Thread({
            content: useCasePayload.content,
            images: useCasePayload.images,
            createdBy: useCasePayload.createdBy,
            createdAt: useCasePayload.createdAt,
            refreshToken: useCasePayload.refreshToken,
        }));
    });
});
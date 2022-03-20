const AddComment = require("../AddComment");


describe('a AddComment entities', () => {
  it('should throw error when payload did not contain needed property', () => {

    // Arrange
    const payload = {
      content: true,
    };

    // Action and Assert
    expect(() => new AddComment(payload)).toThrowError('ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      content: 123,
      threadId: true,
      owner: true,
      username: true,
    };

    // Action and Assert
    expect(() => new AddComment(payload)).toThrowError('ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });


  it('should create add comment object correctly', () => {
    // Arrange
    const payload = {
        content: 'Keren',
        threadId: 'thread-123',
        owner: 'user-123',
        username: 'hakaman',
    };

    // Action
    const { 
        content,
        threadId,
        commentId,
        owner,
        username,
    } = new AddComment(payload);

    // Assert
    expect(content).toEqual(payload.content);
    expect(threadId).toEqual(payload.threadId);
    expect(commentId).toEqual(payload.commentId);
    expect(owner).toEqual(payload.owner);
    expect(username).toEqual(payload.username);
  });
});

const AddedComment = require("../AddedComment");


describe('a AddedComment entities', () => {
  it('should throw error when payload did not contain needed property', () => {

    // Arrange
    const payload = {
      content: true,
    };

    // Action and Assert
    expect(() => new AddedComment(payload)).toThrowError('ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 123,
      content: 123,
      threadId: true,
      owner: true,
      date: new Date().toDateString(),
      username: true,
    };

    // Action and Assert
    expect(() => new AddedComment(payload)).toThrowError('ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });


  it('should create add comment object correctly', () => {
    // Arrange
    const payload = {
        id: 'comment-123',
        content: 'Keren',
        threadId: 'thread-123',
        owner: 'user-123',
        date: new Date().toDateString(),
        username: 'hakaman',
    };

    // Action
    const { 
        id,
        content,
        threadId,
        owner,
        date,
        username,
    } = new AddedComment(payload);

    // Assert
    expect(id).toEqual(payload.id);
    expect(content).toEqual(payload.content);
    expect(threadId).toEqual(payload.threadId);
    expect(owner).toEqual(payload.owner);
    expect(date).toEqual(payload.date);
    expect(username).toEqual(payload.username);
  });
});

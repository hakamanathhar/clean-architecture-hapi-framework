const Thread = require("../Thread");


describe('a AddedThread entities', () => {
  it('should throw error when payload did not contain needed property', () => {

    // Arrange
    const payload = {
      title: 123,
      body: true,
    };

    // Action and Assert
    expect(() => new Thread(payload)).toThrowError('ADD_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      title: 123,
      body: true,
      owner: true,
      username: true,
    };

    // Action and Assert
    expect(() => new Thread(payload)).toThrowError('ADD_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });


  it('should create registerUser object correctly', () => {
    // Arrange
    const payload = {
      title: 'Thread Test',
      body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      owner: 'user-kIb7RsEyKODmRoFT22FSR',
      username: 'hakaman'
    };

    // Action
    const { 
        title, 
        body,
        owner,
        username,
    } = new Thread(payload);

    // Assert
    expect(title).toEqual(payload.title);
    expect(body).toEqual(payload.body);
    expect(owner).toEqual(payload.owner);
    expect(username).toEqual(payload.username);
  });
});

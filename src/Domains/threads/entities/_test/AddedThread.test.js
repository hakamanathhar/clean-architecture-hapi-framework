const AddedThread = require("../AddedThread");


describe('a AddedThread entities', () => {
  it('should throw error when payload did not contain needed property', () => {

    // Arrange
    const payload = {
      title: 123,
      body: true,
    };

    // Action and Assert
    expect(() => new AddedThread(payload)).toThrowError('ADDED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 123,
      title: 123,
      body: true,
      owner: true,
      username: true,
      date: '2022-01-20',
    };

    // Action and Assert
    expect(() => new AddedThread(payload)).toThrowError('ADDED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });


  it('should create registerUser object correctly', () => {
    // Arrange
    const payload = {
      id: '123',
      title: 'AddedThread Test',
      body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      owner: 'user-kIb7RsEyKODmRoFT22FSR',
      username: 'hakaman',
      date: '2022-01-20',
    };

    // Action
    const { 
        id, 
        title, 
        body,
        owner,
        username,
        date,
    } = new AddedThread(payload);

    // Assert
    expect(id).toEqual(payload.id);
    expect(title).toEqual(payload.title);
    expect(body).toEqual(payload.body);
    expect(owner).toEqual(payload.owner);
    expect(username).toEqual(payload.username);
    expect(date).toEqual(payload.date);
  });
});

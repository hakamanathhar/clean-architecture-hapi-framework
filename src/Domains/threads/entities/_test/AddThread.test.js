const AddThread = require("../AddThread");


describe('a AddedThread entities', () => {
  it('should throw error when payload did not contain needed property', () => {

    // Arrange
    const payload = {
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      images: 'images1.jpg',
      createdBy: 'user-kIb7RsEyKODmRoFT22FSR'
    };

    // Action and Assert
    expect(() => new AddThread(payload)).toThrowError('ADD_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      content: 123,
      images: true,
      createdBy: 1.2,
      createdAt: true,
    };

    // Action and Assert
    expect(() => new AddThread(payload)).toThrowError('ADD_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });


  it('should create registerUser object correctly', () => {
    const date = new Date();
    const dateFormat = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    const dateTime = `${dateFormat} ${time}`;

    // Arrange
    const payload = {
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      images: 'images1.jpg',
      createdBy: 'user-kIb7RsEyKODmRoFT22FSR',
      createdAt: dateTime
    };

    // Action
    const { 
        content, 
        images, 
        createdBy,
        createdAt, 
    } = new AddThread(payload);

    // Assert
    expect(content).toEqual(payload.content);
    expect(images).toEqual(payload.images);
    expect(createdBy).toEqual(payload.createdBy);
    expect(createdAt).toEqual(payload.createdAt);
  });
});

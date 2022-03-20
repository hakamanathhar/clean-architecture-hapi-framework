const pool = require('../../database/postgres/pool');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const AddThread = require('../../../Domains/threads/entities/AddThread');
const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgres');
const AddedThread = require('../../../Domains/threads/entities/AddedThread');
const InvariantError = require('../../../Commons/exceptions/InvariantError');
 
describe('ThreadRepositoryPostgres', () => {
  afterEach(async () => {
    await ThreadsTableTestHelper.cleanTable();
  });
 
  afterAll(async () => {
    await pool.end();
  });

 
  describe('addThread function', () => {
    it('should persist register user', async () => {
      // Arrange
      const thread = new AddThread({
        title: 'AddThread Test',
        body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        owner: 'user-kIb7RsEyKODmRoFT22FSR',
        username: 'hakaman',
      });
      const fakeIdGenerator = () => '123'; // stub!
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);
 
      // Action
      await threadRepositoryPostgres.addThread(thread);
 
      // Assert
      const threads = await ThreadsTableTestHelper.findThreadsById('thread-123');
      expect(threads).toHaveLength(1);
    });
 
    it('should return added thread correctly', async () => {
      // Arrange
      const thread = new AddThread({
        title: 'AddThread Test',
        body: 'Lorem Ipsum is simply',
        owner: 'user-kIb7RsEyKODmRoFT22FSR',
        username: 'hakaman',
      });
      const fakeIdGenerator = () => '123'; // stub!
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);
 
      // Action
      const threads = await threadRepositoryPostgres.addThread(thread);
 
      // Assert
      expect(threads).toStrictEqual(new AddedThread({
        id: 'thread-123',
        title: thread.title,
        body: thread.body,
        owner: thread.owner,
        username: thread.username,
        date: new Date().toDateString()
      }));
    });
  });

 
  describe('findThreadsByIdExist function', () => {
    it('should return thread not exist', async () => {
      // Arrange
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});
      
      // Action & Assert
      await expect(threadRepositoryPostgres.findThreadsByIdExist('123')).rejects.toThrowError(InvariantError);
    });
 
    it('should return thread exist', async () => {
      // Arrange
      await ThreadsTableTestHelper.addThread({
        id: '123',
        title: 'AddThread Test',
        body: 'Lorem Ipsum is simply',
        owner: 'user-kIb7RsEyKODmRoFT22FSR',
        username: 'hakaman',
      })
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});
      
      // Action &Assert
      expect(threadRepositoryPostgres.findThreadsByIdExist('123')).resolves.not.toThrowError(InvariantError);;
    });
  });
});
const pool = require('../../database/postgres/pool');
const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const AddComment = require('../../../Domains/comments/entities/AddComment');
const CommentRepositoryPostgres = require('../CommentRepositoryPostgres');
const AddedComment = require('../../../Domains/comments/entities/AddedComment');
 
describe('CommentRepositoryPostgres', () => {
  afterEach(async () => {
    await CommentsTableTestHelper.cleanTable();
  });
 
  afterAll(async () => {
    await pool.end();
  });

 
  describe('addComment function', () => {
    it('should persist register user', async () => {
      // Arrange
      const comment = new AddComment({
        content: 'Keren',
        threadId: 'thread-123',
        owner: 'user-123',
        username: 'hakaman',
      });
      const fakeIdGenerator = () => '123'; // stub!
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);
 
      // Action
      await commentRepositoryPostgres.addComment(comment);
 
      // Assert
      const comments = await CommentsTableTestHelper.findCommentsById('comment-123');
      expect(comments).toHaveLength(1);
    });
 
    it('should return added comment correctly', async () => {
      // Arrange
      const comment = new AddComment({
        content: 'Keren',
        threadId: 'thread-123',
        owner: 'user-123',
        username: 'hakaman',
      });
      const fakeIdGenerator = () => '123'; // stub!
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);
 
      // Action
      const comments = await commentRepositoryPostgres.addComment(comment);
 
      // Assert
      expect(comments).toStrictEqual(new AddedComment({
        id: 'comment-123',
        content: comment.content,
        threadId: comment.threadId,
        owner: comment.owner,
        username: comment.username,
        date: new Date().toDateString()
      }));
    });
  });
});
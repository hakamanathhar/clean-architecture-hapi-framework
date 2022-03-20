/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool')
 
const CommentsTableTestHelper = {

  async addComment({
    id = 'comment-123',
    content = 'Keren',
    threadId = 'thread-123',
    owner = 'user-123',
    username = 'hakaman',
  }) {
    const query = {
      text: `INSERT INTO comments (id, content, threadId, owner, username) 
        VALUES($1, $2, $3, $4, $5)`,
      values: [id, content, threadId, owner, username],
    }
 
    await this.pool.query(query)
  },
  async findCommentsById(id) {
    const query = {
      text: 'SELECT * FROM comments WHERE id = $1',
      values: [id],
    };
 
    const result = await pool.query(query);
    return result.rows;
  },
  async cleanTable() {
    await pool.query('TRUNCATE TABLE comments');
  },
}
 
module.exports = CommentsTableTestHelper
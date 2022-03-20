/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool')
 
const ThreadsTableTestHelper = {

  async addThread({
    id = 'thread-123',
    title = 'AddThread Test',
    body = 'Lorem Ipsum',
    owner = 'user-kIb7RsEyKODmRoFT22FSR',
    username = 'hakaman',
  }) {
    const query = {
      text: 'INSERT INTO threads (id, title, body, owner, username) VALUES($1, $2, $3, $4, $5)',
      values: [id, title, body, owner, username],
    }
 
    await pool.query(query)
  },
  async findThreadsById(id) {
    const query = {
      text: 'SELECT * FROM threads WHERE id = $1',
      values: [id],
    };
 
    const result = await pool.query(query);
    return result.rows;
  },
  async cleanTable() {
    await pool.query('TRUNCATE TABLE threads');
  },
}
 
module.exports = ThreadsTableTestHelper
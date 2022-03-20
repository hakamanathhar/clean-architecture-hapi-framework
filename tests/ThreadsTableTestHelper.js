/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool')
 
const ThreadsTableTestHelper = {

  async addThread({
    id = 'thread-123',
    content = 'Lorem Ipsum is simply dummy text',
    images = 'images1.jpg',
    createdBy = 'user-kIb7RsEyKODmRoFT22FSR',
  }) {
    const query = {
      text: 'INSERT INTO threads VALUES($1, $2, $3, $4)',
      values: [id, content, images, createdBy],
    }
 
    await this.pool.query(query)
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
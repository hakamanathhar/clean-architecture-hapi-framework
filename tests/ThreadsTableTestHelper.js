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
 
    return await this.pool.query(query)
  },
  async cleanTable() {
    await pool.query('TRUNCATE TABLE users');
  },
}
 
module.exports = ThreadsTableTestHelper
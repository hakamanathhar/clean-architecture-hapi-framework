const Thread = require('../../Domains/threads/entities/Thread');
const ThreadRepository = require('../../Domains/threads/ThreadRepository');
 
class ThreadRepositoryPostgres extends ThreadRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addThread(thread) {
    const { title, body, owner, username } = thread;
    const id = `thread-${this._idGenerator()}`;
    const query = {
      text: `INSERT INTO threads (id, title, body, owner, username) 
      VALUES($1, $2, $3, $4, $5) 
      RETURNING id, title, body, owner, username, date`,
      values: [id, title, body, owner, username],
    };
 
    const result = await this._pool.query(query);
    const data = result.rows[0]
    
    return new Thread({ 
      title: data.title,
      body: data.body,
      owner: data.owner,
      date: new Date(data.date).toDateString(),
      username: data.username,
    });
  }
}
 
module.exports = ThreadRepositoryPostgres;
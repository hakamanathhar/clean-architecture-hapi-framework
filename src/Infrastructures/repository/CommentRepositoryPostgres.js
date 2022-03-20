const AddedComment = require('../../Domains/comments/entities/AddedComment')
const ThreadRepository = require('../../Domains/threads/ThreadRepository')
 
class CommentRepositoryPostgres extends ThreadRepository {
  constructor(pool, idGenerator) {
    super()
    this._pool = pool
    this._idGenerator = idGenerator
  }

  async addComment(comment) {
    const { 
      content,
      threadId,
      owner,
      username,
     } = comment
    const id = `comment-${this._idGenerator()}`
    const query = {
      text: `INSERT INTO comments (id, content, thread_id, owner, username) 
      VALUES($1, $2, $3, $4, $5) 
      RETURNING id, content, thread_id, owner, username, date`,
      values: [id, content, threadId, owner, username],
    }
 
    const result = await this._pool.query(query)
    const data = result.rows[0]
    
    return new AddedComment({ 
      id: data.id,
      content: data.content,
      threadId: data.thread_id,
      owner: data.owner,
      username: data.username,
      date: new Date(data.date).toDateString(),
    })
  }
}
 
module.exports = CommentRepositoryPostgres
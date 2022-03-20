class AddedComment {
    constructor(payload) {
        this._verifyPayload(payload)
    
        const { 
            id,
            content,
            threadId,
            owner,
            date,
            username,
        } = payload
        
        this.id = id
        this.content = content
        this.threadId = threadId
        this.owner = owner
        this.date = date
        this.username = username
      }
    
      _verifyPayload({ 
        id,
        content,
        threadId,
        owner,
        date,
        username,
      }) {
        if (!id || !content || !threadId || !owner || !date || !username) {
          throw new Error('ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY')
        }
        
        if ( 
            this._checkType(id) || this._checkType(content) || this._checkType(threadId) || 
            this._checkType(owner) || this._checkType(username)
        
        ) {
          throw new Error('ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION')
        }
      }

      _checkType(value, type='string'){
          return typeof value !== type
      }
}

module.exports = AddedComment
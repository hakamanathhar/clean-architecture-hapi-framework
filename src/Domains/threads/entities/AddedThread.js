class AddedThread {
    constructor(payload) {
        this._verifyPayload(payload)
    
        const { 
            id, 
            title, 
            body,
            owner,
            username,
            date,
        } = payload
        this.id = id
        this.title = title
        this.body = body
        this.owner = owner
        this.username = username
        this.date = date
      }
    
      _verifyPayload({ 
          id,
          title, 
          body,
          owner,
          username,
          date,
      }) {
        if ( !id || !title || !body || !owner || !username || !date) {
          throw new Error('ADDED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY')
        }
        
        if ( this._checkType(id) || this._checkType(title) || 
          this._checkType(body) || this._checkType(owner) || this._checkType(date)) {
          throw new Error('ADDED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION')
        }
      }

      _checkType(value, type='string'){
          return typeof value !== type
      }
}

module.exports = AddedThread
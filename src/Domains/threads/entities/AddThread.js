class AddThread {
    constructor(payload) {
        this._verifyPayload(payload)
    
        const { 
            title, 
            body,
            owner,
            username,
        } = payload

        this.title = title
        this.body = body
        this.owner = owner
        this.username = username
      }
    
      _verifyPayload({ 
          title, 
          body,
          owner,
          username,
      }) {
        if (!title || !body || !owner || !username ) {
          throw new Error('ADD_THREAD.NOT_CONTAIN_NEEDED_PROPERTY')
        }
        
        if ( this._checkType(title) || this._checkType(body) || this._checkType(owner) || this._checkType(username)) {
          throw new Error('ADD_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION')
        }
      }

      _checkType(value, type='string'){
          return typeof value !== type
      }
}

module.exports = AddThread
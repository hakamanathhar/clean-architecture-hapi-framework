class AddThread {
    constructor(payload) {
        this._verifyPayload(payload);
    
        const { 
            content, 
            images, 
            createdBy,
            createdAt, 
        } = payload;
    
        this.content = content;
        this.images = images;
        this.createdBy = createdBy;
        this.createdAt = createdAt;
      }
    
      _verifyPayload({ 
            content, 
            images, 
            createdBy,
            createdAt, 
      }) {
        if (!content || !images || !createdBy || !createdAt) {
          throw new Error('ADD_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
        }
    
        if ( this._checkType(content) || this._checkType(images) 
            || this._checkType(createdBy) || this._checkType(createdAt)) {
          throw new Error('ADD_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }
      }

      _checkType(value, type='string'){
          return typeof value !== type;
      }
}

module.exports = AddThread
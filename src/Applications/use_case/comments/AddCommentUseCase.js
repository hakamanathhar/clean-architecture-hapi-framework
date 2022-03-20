const AddComment = require("../../../Domains/comments/entities/AddComment")

class AddCommentUseCase {

  constructor({ commentRepository, authTokenManager }) {
    this._commentRepository = commentRepository
    this._authTokenManager = authTokenManager
  }
 
  async execute(useCasePayload) {
    this._verifyPayload(useCasePayload)
    const { authorization } = useCasePayload.headers
    await this._authTokenManager.verifyAccessToken(authorization)
    const { id, username } = await this._authTokenManager.decodePayload(authorization)
    const comment = new AddComment({
      ...useCasePayload.payload,
      owner: id || '-',
      username: username || '-',
    })
    return this._commentRepository.addComment(comment)
  }

  _verifyPayload(payload){
    const { authorization } = payload.headers

    if(!authorization){
        throw new Error('ADD_COMMENT_USE_CASE.NOT_CONTAIN_TOKEN')
    }

    if(typeof authorization !== 'string'){
        throw new Error('ADD_COMMENT_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATIONS')
    }
}
}

module.exports = AddCommentUseCase
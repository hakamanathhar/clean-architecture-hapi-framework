const AddComment = require("../../../../Domains/comments/entities/AddComment")


class AddCommentUseCase {

  constructor({ commentRepository, authTokenManager, threadRepository}) {
    this._commentRepository = commentRepository
    this._authTokenManager = authTokenManager
    this._threadRepository = threadRepository
  }
 
  async execute(useCasePayload) {
    this._verifyPayload(useCasePayload)
    const { authorization } = useCasePayload.headers
    await this._authTokenManager.verifyAccessToken(authorization)
    const { id, username } = await this._authTokenManager.decodePayload(authorization)
    await this._threadRepository.findThreadsByIdExist(useCasePayload.params.threadId)
    const comment = new AddComment({
      ...useCasePayload.payload,
      ...useCasePayload.params,
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
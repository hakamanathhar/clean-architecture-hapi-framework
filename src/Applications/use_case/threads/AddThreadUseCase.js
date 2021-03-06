const AddThread = require("../../../Domains/threads/entities/AddThread")

class AddThreadUseCase {

  constructor({ threadRepository, authTokenManager }) {
    this._threadRepository = threadRepository
    this._authTokenManager = authTokenManager
  }
 
  async execute(useCasePayload) {
    this._verifyPayload(useCasePayload)
    const { authorization } = useCasePayload.headers
    await this._authTokenManager.verifyAccessToken(authorization)
    const { id, username } = await this._authTokenManager.decodePayload(authorization)
    const thread = new AddThread({
      ...useCasePayload.payload,
      owner: id || '-',
      username: username || '-',
    })
    return this._threadRepository.addThread(thread)
  }

  _verifyPayload(payload){
    const { authorization } = payload.headers

    if(!authorization){
        throw new Error('ADD_THREAD_USE_CASE.NOT_CONTAIN_TOKEN')
    }

    if(typeof authorization !== 'string'){
        throw new Error('ADD_THREAD_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATIONS')
    }
}
}

module.exports = AddThreadUseCase
const Thread = require("../../../Domains/threads/entities/Thread");

class AddThreadUseCase {

  constructor({ threadRepository, authTokenManager }) {
    this._threadRepository = threadRepository;
    this._authTokenManager = authTokenManager;
  }
 
  async execute(useCasePayload) {
    this._verifyPayload(useCasePayload)
    const { refreshToken } = useCasePayload
    const thread = new Thread(useCasePayload);
    await this._authTokenManager.verifyRefreshToken(refreshToken);
    return this._threadRepository.addThread(thread);
  }

  _verifyPayload(payload){
    const { refreshToken } = payload
    if(!refreshToken){
        throw new Error('ADD_THREAD_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN')
    }

    console.log('hakaman',typeof refreshToken)
    if(typeof refreshToken !== 'string'){
        throw new Error('ADD_THREAD_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATIONS')
    }
}
}

module.exports = AddThreadUseCase
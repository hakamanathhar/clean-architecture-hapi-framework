const AddThreadUseCase = require('../../../../Applications/use_case/threads/AddThreadUseCase');
 
class ThreadsHandler {
  constructor(container) {
    this._container = container;
 
    this.postThreadHandler = this.postThreadHandler.bind(this);
  }
 
  async postThreadHandler(request, h) {
    // try {
      const addThreadUseCase = this._container.getInstance(AddThreadUseCase.name);
      const addedThread = await addThreadUseCase.execute(request);
      const response = h.response({
        status: 'success',
        data: {
          addedThread,
        },
      });
      response.code(201);
      return response;
    // } catch (error) {
    //   console.log(error)
    // }
  }
}
 
module.exports = ThreadsHandler;
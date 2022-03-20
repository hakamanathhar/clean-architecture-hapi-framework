const AddCommentUseCase = require("../../../../../Applications/use_case/threads/comments/AddCommentUseCase");

 
class CommentsHandler {
  constructor(container) {
    this._container = container;
 
    this.postCommentHandler = this.postCommentHandler.bind(this);
  }
 
  async postCommentHandler(request, h) {
      const addCommentUseCase = this._container.getInstance(AddCommentUseCase.name);
      const addedComment = await addCommentUseCase.execute(request);
      const response = h.response({
        status: 'success',
        data: {
          addedComment,
        },
      });
      response.code(201);
      return response;
  }
}
 
module.exports = CommentsHandler;
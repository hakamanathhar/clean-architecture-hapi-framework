const routes = (handler) => ([
    {
      method: 'POST',
      path: '/threads/{threadId}/comments',
      handler: handler.postCommentHandler,
    },
]);
   
  module.exports = routes;
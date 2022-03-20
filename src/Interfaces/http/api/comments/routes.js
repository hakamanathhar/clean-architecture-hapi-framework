const routes = (handler) => ([
    {
      method: 'POST',
      path: '/comments',
      handler: handler.postCommentHandler,
    },
]);
   
  module.exports = routes;
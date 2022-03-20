const CommentsHandler = require('./handler');
const routes = require('./routes');
 
module.exports = {
  name: 'comments',
  register: async (server, { container }) => {
    const threadsHandler = new CommentsHandler(container);
    server.route(routes(threadsHandler));
  },
};
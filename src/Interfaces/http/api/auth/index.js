const AuthHandler = require("./handler")
const routes = require("./routes")

module.exports = {
    name: 'auth',
    register: async (server, { container }) => {
        const authHandler = new AuthHandler(container)
        server.route(routes(authHandler))
    },
}
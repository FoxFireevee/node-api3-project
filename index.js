// require your server and launch it
const server = require('./api/server')

const port = 9000

server.listen(port, () => {
    console.log('Server launched on http://localhost:9000')
})
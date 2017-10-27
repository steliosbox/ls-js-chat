const http = require("http");
const server = new http.Server();
const httpServer = require('./server/http-server.js');

const ws = require("ws");
const wss = new ws.Server({ server });
const wsServer = require('./server/ws-server.js');

server.on('request', httpServer);

wss.on('connection', wsServer);

server.listen(process.env.PORT, process.env.IP, () => {

    console.log("Server runing on port %d", server.address().port);
});
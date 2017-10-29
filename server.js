const http = require("http");
const server = new http.Server();
const httpServer = require('./server/http-server.js');

const ws = require("ws");
const WebServer = require('./server/ws-server.js');
const wss = new ws.Server({ server });
const wsServer = new WebServer(wss);

server.on('request', httpServer);

server.listen(process.env.PORT, process.env.IP, () => {

    console.log("Server runing on port %d", server.address().port);
});


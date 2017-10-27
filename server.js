const http = require("http");
const server = new http.Server();
const httpServer = require('./server/http-server.js');

server.listen(process.env.PORT, process.env.IP, () => {

    console.log("Server runing on port %d", server.address().port);
});

server.on('request', httpServer);
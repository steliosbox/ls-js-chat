const http = require("http");
const ws = require("ws");
const server = new http.Server();
const wss = new ws.Server({ server });
const httpServer = require('./server/http-server.js');

server.listen(process.env.PORT, process.env.IP, () => {

    console.log("Server runing on port %d", server.address().port);
});

server.on('request', httpServer);


const connections = [];

wss.on('connection', (ws, request) => {

    connections.push(ws);

    console.log('new connection');

    ws.on('message', (event) => {

        console.log(event);

        connections.forEach((connection) => {

            connection.send(event, error => {

                // on sending error
                if (error) {

                    // remove form array closed connection
                    connections = connections.filter(current => {

                        return current !== connection;
                    });
                }
            });
        })

    });
});
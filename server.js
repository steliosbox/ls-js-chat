const http = require("http");
const server = new http.Server();

server.listen(process.env.PORT || 8080, process.env.IP || "127.0.0.1", () => {

  console.log("Server runing on port %d", server.address().port);
});

server.on('request', (request, response) => {
    
    response.end('Server is up & running!');
})


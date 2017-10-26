const http = require("http");
const server = new http.Server();

server.listen(process.env.PORT, process.env.IP, () => {

    console.log("Server runing on port %d", server.address().port);
});

server.on('request', (request, response) => {
    
    console.log('========== new request to', request.url);
    
    response.end('Server is up & running!');
    
})
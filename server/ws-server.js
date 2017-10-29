module.exports = class {

    constructor(wss) {

        this.wss = wss;
        this.clients = [];

        wss.on('connection', (socket, request) => {
            this.onConnection(socket, request);
        });

        setInterval(() => this.checkConnections(), 30000);
    }

    onConnection(socket, request) {

        console.log('New connection.');

        socket.clientID = Date.now();
        socket.isAlive = true;

        this.clients.push(socket);
        this.onMessage(socket);
        this.onPong(socket);
        this.onClose(socket);
        this.checkConnections();
    }

    onMessage(socket) {

        socket.on('message', (dataMessage) => {

            let result = JSON.parse(dataMessage);

            if(result.type === 'echo') {

                socket.username = result.username;

                this._onlineStatus(result.username);
            }

            this.broadcast(JSON.stringify(result));
        });
    }

    onClose(socket) {

        socket.on('close', () => {

            this._terminate(socket);

            console.log('Connection %s is terminated, total %s connections has left', socket.clientID, this.clients.length);
        });
    }

    onPong(socket) {
        socket.on('pong', this._heartbeat);
    }

    checkConnections() {

        this.clients.forEach(socket => {

            console.log('Connection %s is %s', socket.clientID, socket.isAlive, socket.username);

            if (socket.isAlive === false) return this._terminate(socket);

            if (socket.username) this._onlineStatus(socket.username);

            socket.isAlive = false;
            socket.ping('', false, true);
        });

        console.log('Total %s connections', this.clients.length);
    }

    broadcast(dataMessage) {

        console.log(dataMessage);

        // go through all connections
        this.clients.forEach(socket => {
            // send message to clients
            this._send(socket, dataMessage);
        });
    }

    _onlineStatus(username) {

        this.broadcast(JSON.stringify({
            type: 'onlineStatus',
            time: Date.now(),
            username: username
        }));
    }

    _send(socket, dataMessage) {
        // send message to clients
        socket.send(dataMessage, error => {
            // on sending error
            if (error) {
                // closing connection.
                this._terminate(socket);
            }
        });
    }

    _heartbeat() {
        this.isAlive = true;
    }

    // closing connection.
    _terminate(socket) {
        this.clients = this.clients.filter(current => current !== socket);
    }


    // emit.saveConncetion(socket);
    // console.log('new connection %s', clientID);
    // socket.on('message', (event) => emit.onMessage(event, socket));
    // socket.on('close', () => emit.checkConnections());
};


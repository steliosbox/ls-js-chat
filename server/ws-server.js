let Mysql = require('./my_modules/mysql.js')
let mysql = new Mysql();

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

                mysql.query('SELECT * FROM messages') //  ORDER BY time DESC LIMIT 3
                    .then(result => result)
                    .catch(error => error.code)
                    .then(array => {

                        this.sendToSelf(socket, {type: 'data', message: array});
                    });

            } else if (result.type === 'message') {

                this._saveToDB(result);
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

    sendToSelf(socket, data) {

        if(typeof data !== 'string') {

            data = JSON.stringify(data);
        }

        this._send(socket, data);
    }

    _saveToDB(data) {

        let { message, time, username } = data;

        mysql.query('INSERT INTO messages (username, message, time) VALUES ("' + username + '", "' + message + '", "' + time + '")')
        .then(result => result)
        .catch(error => error.code)
        .then(status => {

            console.log(status);
        });
    }


    _onlineStatus(username) {

        this.broadcast(JSON.stringify({
            type: 'onlineStatus',
            time: Date.now(),
            username: username
        }));
    }

    _send(socket, data) {
        // send message to clients
        socket.send(data, error => {
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


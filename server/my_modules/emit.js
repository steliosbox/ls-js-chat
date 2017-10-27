'use strict';

// @ toAll
// @ exceptSelf
// @ saveConncetion
// @ removeConnection
// @ getConnections

module.exports = class {

    constructor() {

        this.connections = []
    }

    _send(connection, message) {

        // send message to clients
        connection.send(message, error => {

            // on sending error
            if (error) {

                // closing connection.
                this.removeConnection(connection);
            }
        });
    }

    _forEach(message, ws) {

        // go through all connections
        this.connections.forEach(connection => {

            // if corrent connection is isset,
            // send to all except self
            if(ws && connection === ws) return;

            // send message to clients
            this._send(connection, message);
        });
    }

    toAll(data) {

        this._forEach(data)
    }

    exceptSelf(data, ws) {

        this._forEach(data, ws);
    }

    saveConncetion(connection) {

        this.connections.push(connection);
    }

    // closing connection.
    // in argument we pass the connection we want to close
    removeConnection(connection) {

        // remove form array closed connection
        this.connections = this.connections.filter(current => {

            return current !== connection;
        });
    }

    getConnections() {

        return this.connections;
    }
};



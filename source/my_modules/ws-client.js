'use strict';

module.exports = class {

    constructor () {

        this.socket = null;
        this.ws()
    }

    ws() {
        this.socket = new WebSocket('wss://ls-js-chat-steliosbox.c9users.io:8080');
        this.onopen();
        this.onclose();
    }

    onopen(callback) {

        this.socket.onopen = () => {

            console.log('WS Server is up!');

            callback ? callback() : '';
        };
    }

    onclose() {

        this.socket.onclose = () => {

            // Try to reconnect in 5 seconds
            console.log('Try to reconnect in 5 seconds');

            setTimeout(() => {

                this.ws();
            }, 5000);
        };
    }

    send(data) {

        this.socket.send(data);
    }

    onMessage(callback) {

        this.socket.addEventListener('message', event => callback(event));
    }
};
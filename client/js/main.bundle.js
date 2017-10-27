'use strict';

class WSServer {

    constructor () {

        this.socket = null;
        this.ws()
    }

    ws() {
        this.socket = new WebSocket('wss://ls-js-chat-steliosbox.c9users.io');
        this.onopen();
        this.onclose();
    }

    onopen() {

        this.socket.onopen = () => {

            console.log('WS Server is up!');

            let data = JSON.stringify({
                type: 'greeting'
            });

            this.send(data);
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
}

let ws = new WSServer();

console.log(ws);

ws.onMessage((event) => {

    console.log(event);
});
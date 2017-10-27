'use strict';

const WSClient = require("./my_modules/ws-client.js")
let ws = new WSClient();


ws.onMessage((event) => {

    console.log(event);
});



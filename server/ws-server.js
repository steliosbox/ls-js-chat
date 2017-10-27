const Emit = require('./my_modules/emit.js');
const emit = new Emit();

module.exports = (ws, request) => {

    emit.saveConncetion(ws);

    console.log('new connection');

    ws.on('message', (event) => {

        console.log(event);

        emit.toAll(event);

    });
};
'use strict';

const WSClient = require("./my_modules/ws-client.js");

let ws = new WSClient();


ws.onMessage((event) => {

    console.log(event);
});


import comments from './components/comments.vue';

new Vue({

    el: '#comments',

    components: {

        comments: comments
    }
});


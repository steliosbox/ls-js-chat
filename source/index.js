'use strict';

const Cookies = require("./my_modules/cookies.js");
const cookie = new Cookies();

let auth = cookie.get('auth');

if (!auth) {

    let person = prompt('Please enter your name', '');

    if (person !== null) {

        auth = person;
        cookie.set('auth', person, 30);

    } else {

        auth = 'Guest';
    }
}

import comments from './components/comments.vue';
import friends from './components/friends.vue';
import WsClient from './my_modules/ws-client.js'

let wsClient = new WsClient(auth);

new Vue({

    el: '#chat',

    data: {
        username: auth,
        wsClient: wsClient
    },

    components: {
        comments: comments,
        friends: friends
    }
});
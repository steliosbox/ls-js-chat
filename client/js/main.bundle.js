!function(n){function e(o){if(t[o])return t[o].exports;var s=t[o]={i:o,l:!1,exports:{}};return n[o].call(s.exports,s,s.exports,e),s.l=!0,s.exports}var t={};e.m=n,e.c=t,e.d=function(n,t,o){e.o(n,t)||Object.defineProperty(n,t,{configurable:!1,enumerable:!0,get:o})},e.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return e.d(t,"a",t),t},e.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},e.p="",e(e.s=1)}([function(n,e,t){"use strict";function o(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}var s=function(){function n(n,e){for(var t=0;t<e.length;t++){var o=e[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(n,o.key,o)}}return function(e,t,o){return t&&n(e.prototype,t),o&&n(e,o),e}}();n.exports=function(){function n(){o(this,n),this.socket=null,this.ws()}return s(n,[{key:"ws",value:function(){this.socket=new WebSocket("wss://ls-js-chat-steliosbox.c9users.io"),this.onopen(),this.onclose()}},{key:"onopen",value:function(){var n=this;this.socket.onopen=function(){console.log("WS Server is up!");var e=JSON.stringify({type:"greeting"});n.send(e)}}},{key:"onclose",value:function(){var n=this;this.socket.onclose=function(){console.log("Try to reconnect in 5 seconds"),setTimeout(function(){n.ws()},5e3)}}},{key:"send",value:function(n){this.socket.send(n)}},{key:"onMessage",value:function(n){this.socket.addEventListener("message",function(e){return n(e)})}}]),n}()},function(n,e,t){t(2),n.exports=t(0)},function(n,e,t){"use strict";(new(t(0))).onMessage(function(n){console.log(n)})}]);
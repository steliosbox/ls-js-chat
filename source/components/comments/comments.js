export default {

    data () {

        return {

            list: [],
            typing: '',
            correntUser: this.$parent.username,
            wsClient: this.$parent.wsClient,
        }
    },

    mounted: function () {

        this.wsClient.onopen(() => {

           this.sendData({
               type: 'echo'
           });
        });

        this.wsClient.onMessage(event => {

            this.messageType(event.data);
        })
    },

    methods: {

        messageType(messageData) {

            let result = JSON.parse(messageData);

            switch (result.type) {

                case 'message':

                    if(result.username !== this.correntUser) {

                        this.list.push(result);
                        this.scrollTop();
                    }
                    break;

                case 'typing':

                    if (result.username !== this.correntUser) {

                        this.typingFunc(result.username);
                    }
                    break;
            }
        },

        typingFunc(username) {

            clearTimeout(this.timer);

            this.typing = username + ' is typing ...';
            this.timer = setTimeout(() => {

                this.typing = ''

            }, 1000);
        },

        scrollTop() {

            this.$nextTick(() => {

                let elem = this.$el.querySelector('.comments__list');
                elem.scrollTop = elem.scrollHeight;
            })
        },

        submitMessage(e) {

            if(e.keyCode === 13) {

                this.sendData({
                    type: 'message',
                    message: e.target.value
                }, true);

                return e.target.value = '';
            }

            this.sendData({
                type: 'typing'
            });
        },

        sendData(data, push) {

            data.time = Date.now();
            data.username = this.correntUser;

            if(push) {

                this.list.push(data);
                this.scrollTop();
            }

            this.wsClient.send(JSON.stringify(data));
        }
    }
}
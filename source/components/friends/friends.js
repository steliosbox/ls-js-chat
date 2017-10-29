export default {

    data () {

        return {
            friends: [],
            auth: this.$parent.username,
            wsClient: this.$parent.wsClient
        }
    },

    mounted: function () {

        this.wsClient.onMessage(event => {

            let result = JSON.parse(event.data);

            if(result.type === 'onlineStatus') {

                this.friends = this.friends.filter((friend) => {

                    return friend.username !== result.username;
                })

                this.friends.push(result);
            }
        });

        this.todo(this);
    },

    methods: {

        todo: (self) => {

            setInterval(() => {

                self.friends.forEach((friend, index) => {
                    if((Date.now() - friend.time) > 30000) {
                        self.friends.splice(index, 1);
                    }
                })
            }, 30000);
        }
    }
}
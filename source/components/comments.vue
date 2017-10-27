<template src="./comments/comments.html"></template>
<style src="./comments/comments.scss" lang="scss"></style>
<script>
    export default {

        data () {

            return {

                list: [
                    {username: 'hello Vue.js 1'},
                    {username: 'hello Vue.js 2'},
                    {username: 'hello Vue.js 3'}
                ]
            }
        },

        methods: {

            mounted: function(){

                console.log("mouted");
            },

            submitMessage(e) {

                if(e.keyCode === 13) {
                    // console.log(e.keyCode);
                    this.list.push({username: 'hello Vue.js'});
                }
            }
        }
    }
</script>
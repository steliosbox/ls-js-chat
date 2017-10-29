module.exports = class {

    constructor () {

    }

    set (name, value, expires) {

        this.cookieExpires = null;
        this.date = null;

        // if expires was passed by user...
        if (expires) {
            // Get corrent date
            this.date = new Date();
            // by default sets days
            this.date.setDate(this.date.getDate() + expires);
            this.cookieExpires = '; expires=' + this.date.toGMTString();
        }

        document.cookie = name + '=' + value + this.cookieExpires;
    }

    get (name) {

        this.cookiesList = {};
        this.allCookies = document.cookie.split(';');
        this.splitedCookies = null;

        for (let i = 0; i < this.allCookies.length; i++) {

            this.splitedCookies = this.allCookies[i].split('=');

            if (this.splitedCookies.length > 1) {

                this.cookiesList[this.splitedCookies[0].trim()] = this.splitedCookies[1];
            }
        }

        return (name === undefined) ? this.cookiesList : this.cookiesList[name];
    }

    remove (name) {

        this.set(name, '', -1);
    };
};
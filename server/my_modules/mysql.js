'use strict';

let mysql = require('promise-mysql');

module.exports = class {
    
    constructor () {

    }
    
    _database () {
        
        return mysql.createConnection({
            host: '127.0.0.1',
            user: 'steliosbox',
            password: '',
            database: 'c9'
            
        })
    }
    
    query (query) {
    
        return this._database()
        
            .then(connection => {
                
                this.data = connection.query(query);
                
                connection.end();
                
                return this.data;
            });
    }
};


    // const MySql = require('./server/mysql');
    // const mysql = new MySql();
    
    // mysql.query('SELECT * FROM messages ORDER BY time DESC LIMIT 3 ')
    // .then(result => result)
    // .catch(error => error.code)
    // .then(msg => {
        
    //     console.log(msg);
    // });
    
    // let timestamp = Date.now();
    
    // mysql.query('INSERT INTO messages (username, message, image, time) VALUES ("SteliosBox", "Hello world!", "img/avatar.png", "' + timestamp + '")')
    // .then(result => result)
    // .catch(error => error.code)
    // .then(msg => {
        
    //     console.log(msg);
    // });
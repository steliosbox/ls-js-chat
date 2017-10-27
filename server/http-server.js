const fs = require('fs');
const path = require('path');

const mime = require('./my_modules/mime');

const rootDir = './client';
const indexFile = '/index.html';

module.exports = (request, response) => {

    console.log('========== new request to', request.url);

    let url = (request.url === '/') ? indexFile : request.url;
        url = rootDir + url;

    new Promise((resolve, reject) => {

        fs.stat(url, (error, stat) => {

            if (error !== null) {

                return reject(url);
            }

            stat.isFile() ? resolve(url) : reject(url);
        });
    })
        .then(() => ({ path: url, code: 200 }))
        .catch(() => ({ path: `${rootDir}/404.html`, code: 404 }))
        .then(info => {

            const ext = path.extname(info.path);

            // FS READ THE FILE
            fs.readFile(info.path, (error, data) => {

                if (error) {
                    response.writeHead(404, { 'Content-Type': mime['.html'] });
                    response.end(`fs.readFile error: ${info.path}`);
                    return false;
                }

                response.writeHead(info.code, { 'Content-Type': mime[ext] });
                response.end(data);
            });
        });
}
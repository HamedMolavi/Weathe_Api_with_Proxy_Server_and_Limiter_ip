const { deleteFile } = require('../tools/files');
const fs = require('fs');
const path = require('path');

function limitterPromise(ip) {
    if (ip = '::1') ip = 'localhost';
    return new Promise(function (resolve, reject) {
        fs.readFile(path.join(__dirname, `../tickets/${ip}`), (err, data) => {
            if (err) {
                fs.writeFile(path.join(__dirname, `../tickets/${ip}`), 1, 'utf-8', (err) => {
                    if (err) {
                        console.log('Writing and reading ticket file faild. 12');
                        return reject(-1);//============
                    };
                    deleteFile(path.join(__dirname, `../tickets/${ip}`), ip);
                    resolve();
                });
            } else if (data == 5) {
                reject(-2);//================
            } else {
                fs.writeFile(path.join(__dirname, `../tickets/${ip}`), parseInt(data) + 1, 'utf-8', (err) => {
                    if (err) {
                        console.log('Writing and reading ticket file faild. 23');
                        reject(-1);//===============
                    } else {
                        deleteFile(path.join(__dirname, `../tickets/${ip}`), ip);
                        resolve();
                    };
                });
            };
        });
    });
};

module.exports = {
    limitterPromise,
};
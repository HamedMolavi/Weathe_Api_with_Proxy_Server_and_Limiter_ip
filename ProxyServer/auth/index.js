const fs = require('fs');
const path = require('path');
let timeouts = [];


function limitterPromise(ip) {
    if (ip = '::1') ip = 'localhost';
    return new Promise(function (resolve, reject) {
        fs.readFile(path.join(__dirname, `../tickets/${ip}`), (err, data) => {
            if (err) {
                fs.writeFile(path.join(__dirname, `../tickets/${ip}`), 1, 'utf-8', (err) => {
                    if (err) {
                        console.log('Writing and reading ticket file faild.');
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
                        console.log('Writing and reading ticket file faild. 25');
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


function limitter() {
    return async function (req, res, next) {
        try {
            console.log('test');
            await limitterPromise(req.ip);
            console.log('test2');
            next();
        } catch (errCode) {
            console.log(errCode);
            if (errCode === -1) {
                return res.status(500).end();
            } else if (errCode === -2) {
                return res.status(429).end();
            };
        };
    };
};

module.exports = {
    limitter,
};

function deleteFile(filePath, name) {
    clearTimeout(timeouts[name]);
    timeouts[`${name}`] = setTimeout(function () {
        fs.unlink(filePath, (err)=>{
            if (err) console.log(`deleting file ${name} wasn't successful.\n`, err);
        });
    }, 60000);
};
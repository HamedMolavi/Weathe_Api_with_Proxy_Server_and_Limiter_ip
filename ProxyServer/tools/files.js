const path = require('path');
const fs = require('fs');



function deleteFile(filePath, name) {
    clearTimeout(timeouts[name]);
    timeouts[`${name}`] = setTimeout(function () {
        fs.unlink(filePath, (err) => {
            if (err) console.log(`deleting file ${name} wasn't successful.\n`, err);
        });
    }, 60000);
};

function ensureExists(filePath, callback) {
    fs.mkdir(filePath, { recursive: true }, err => {
        if (err) return console.log(`Error in creating\n${filePath}\ndirectory.\n${err}`);
        callback();
    });
};

module.exports = {
    deleteFile,
    ensureExists,
};
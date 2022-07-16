const { limitterPromise } = require('./limitcheck')
timeouts = [];


function limitter() {
    return async function (req, res, next) {
        try {
            await limitterPromise(req.ip);
            next();
        } catch (errCode) {
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
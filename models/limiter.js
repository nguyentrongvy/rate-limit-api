// const client = require('../helper/init_redis');
const { getRedis } = require('../helper/init_redis');

const incr = key => {
    const client = getRedis();
        return new Promise((resolve, reject) => {

            client.incr('abc', (err, result) => {
                // console.log(err);
                // if(err) {
                //     console.log(err)
                //     reject(err);
                // }
                resolve(result);
            });
        });
};

module.exports = {
    incr,
};
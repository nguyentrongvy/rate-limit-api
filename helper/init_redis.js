const {createClient } = require('redis');
// const client = createClient({
//     port: 6379,
//     host: '127.0.0.1'
// });

// client.on('connect', () => {
//     console.log('Redis connected')
// })

// client.on('error', (err) => console.log('Redis Client Error', err));

// client.connect();

let client;

async function connectRedis() {
    client = createClient({
            url: 'redis://127.0.0.1:6379'
        });
        
    await client.connect();

    console.log('redis connected')
    // client.on('connect', () => {
    //     console.log('Redis connected')
    // })
}

function getRedis() {
    if(!client) {
        console.log('client not found')
        return;
    }

    return client;
}



module.exports = {
    connectRedis,
    getRedis
};

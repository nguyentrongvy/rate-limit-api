const express = require('express');
const app = express();
const PORT = 3000;
const { incr } = require('./models/limiter');
const { connectRedis } = require('./helper/init_redis');

// connectRedis();


async function main() {
    await connectRedis();

    app.get('/api', async (req, res) => {
        try {
    
            // get ip
            const getIPUser = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            const numberRequest = await incr(getIPUser);
    
            res.json({
                status: 'success',
                numberRequest,
                elements: [
                    {
                        id: 1, name: 'java',
                    },
                    {id: 2, name: 'nodejs1'},
                    {id: 3, name: 'nodejs1'},
                ]
            });
        } catch (error) {
            throw new Error(error);
        }
    });

    app.listen(PORT, () => {
        console.log(`The server running at ${PORT}`);
    });
}

main();

// app.get('/api', async (req, res) => {
//     try {

//         // get ip
//         const getIPUser = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
//         const numberRequest = await incr(getIPUser);

//         res.json({
//             status: 'success',
//             numberRequest,
//             elements: [
//                 {
//                     id: 1, name: 'java',
//                     id: 2, name: 'nodejs',
//                 },
//             ]
//         });
//     } catch (error) {
//         throw new Error(error);
//     }
// });

// app.listen(PORT, () => {
//     console.log(`The server running at ${PORT}`);
// });

import Hapi from '@hapi/hapi';
import routes from './routes';
import * as admin from 'firebase-admin';
import credentials from '../cred.json';

admin.initializeApp({
    credential:admin.credential.cert(credentials)
});

const start = async () => {
    const server = Hapi.server({
        port: 8000,
        host: 'localhost'
    });

    routes.forEach(route=>{
        server.route(route);
    })

    // server.route
    //     ([
    //         {
    //             method: 'GET',
    //             path: '/hello',
    //             handler: (req, h) => {
    //                 // return h.response('Hello!').code(201);
    //                 return 'Hello!';
    //             }
    //         },
    //         {
    //             method: 'POST',
    //             path: '/hello/post',
    //             handler: (req, h) => {
    //                 const payload = req.payload;
    //                 // return h.response('Hello!').code(201);
    //                 return `Hello ${payload.name}!`;
    //             }
    //         }
    //     ]
    //     )

    await server.start();
    console.log(`server is listening on ${server.info.uri}`);
}

process.on('unhandledRejection', err => {
    console.log(err);
    process.exit(1);
});

start();
import Hapi from '@hapi/hapi';
import routes from './routes';
import * as admin from 'firebase-admin';
import credentials from '../google-credentials.json';
import { db } from './database';



admin.initializeApp({
    credential: admin.credential.cert(credentials)
});

let myServer;

const start = async () => {
    myServer = Hapi.server({
        port: process.env.PORT || 8000,
        routes: {
            cors: {
                origin: ['*'], // an array of origins or 'ignore'
                additionalHeaders: ['AuthToken', 'Access-Control-Allow-Headers', 'Access-Control-Allow-Credentials', 'X-Requested-With', 'content-type'], // an array of additional exposed headers
            }
        }
    });
    routes.push({
        method: 'GET',
        path: '/',
        handler: (req, h) => {
            // return h.response('Hello!').code(201);
            return h.redirect('https://tamweelaqar-fe.herokuapp.com/home');
        }
    })

    routes.forEach(route => {
        myServer.route(route);
    });
    setInterval(() => {

        db.connect()
    }, 2000)


    await myServer.start();
    console.log(`server is listening on ${myServer.info.uri}`);
}

process.on('unhandledRejection', err => {
    console.log(err);
    process.exit(1);
});


process.on('SIGINT', async () => {
    console.log('Stopping Server...');
    await myServer.stop({ timeout: 1000 });
    db.end();
    console.log('Server stopped');
    process.exit(0);
})
start();
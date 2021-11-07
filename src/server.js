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
        port: process.env.PORT || 1337,
        host: '0.0.0.0',
        routes: {
            cors: true
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
        route.options = {
            cors:true
        }
        console.log(route)
        myServer.route(route);
    });

    db.connect();


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
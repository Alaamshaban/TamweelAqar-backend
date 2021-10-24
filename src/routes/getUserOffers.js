import { db } from '../database';
import * as admin from 'firebase-admin';
import Boom from '@hapi/boom';

export const getUserOffers = {
    method: 'GET',
    path: '/api/users/{user_id}/offers',
    handler: async (req, h) => {
        const token = req.headers.authtoken;
        console.log('token??', token);
        try {
            const user = await admin.auth().verifyIdToken(token, true);
            // // admin.auth().verifyIdToken(token, true).then(user => {
            // //     console.log(user)
            // // })
            // console.log(user)
            if (user) {
                const { results } = await db.query(
                    'SELECT * FROM offers',
                );
                return results;
            }
         //   throw Boom.unauthorized('Users can only access offers, Please Sign in first');
        } catch(err) {
            console.log(err)
            throw Boom.unauthorized('Users can only access offers, Please Sign in first');
        }

    }
}
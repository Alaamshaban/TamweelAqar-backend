
import { db } from '../database';
import * as admin from 'firebase-admin';
import Boom from '@hapi/boom';

export const getUser = {
    method: 'GET',
    path: '/api/users/{user_id}',
    cors: true,
    handler: async (req, h) => {
        const token = req.headers.authtoken;
        console.log('token??', token);
        try {
            const user = await admin.auth().verifyIdToken(token, true);
            if (user) {
                const user_id = req.params.user_id;
                console.log(user_id)
                const { results } = await db.query(
                    'SELECT * FROM users WHERE user_id=?',
                    [user_id]
                )
                const user = results[0];
                if (!user) {
                    throw Boom.notFound(`User is not existing with id ${user_id}`)
                }
                return user;
            }
        } catch (err) {
            console.log(err);
            throw Boom.unauthorized('Users can only access offers, Please Sign in first');
        }
    }
}
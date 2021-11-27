
import { db } from '../database';
import * as admin from 'firebase-admin';
import Boom from '@hapi/boom';

export const getUserHistory = {
    method: 'GET',
    path: '/api/users/{user_id}/userhistory',
    handler: async (req, h) => {
        const token = req.headers.authtoken;
        console.log('token??', token);
        try {
            const user = await admin.auth().verifyIdToken(token, true);
            if (user) {
                const user_id = req.params.user_id;
                console.log(user_id)
                db.connect();
                const { results } = await db.query(
                    'SELECT * FROM user_history WHERE user_id=?',
                    [user_id]
                )
                return results;
            }
        } catch (err) {
            console.log(err);
            throw Boom.unauthorized('Users can only access offers, Please Sign in first');
        }
    }
}
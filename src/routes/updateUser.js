
import { db } from '../database';
import * as admin from 'firebase-admin';
import Boom from '@hapi/boom';

export const updateUser = {
    method: 'PUT',
    path: '/api/users/{user_id}',
    handler: async (req, h) => {
        const token = req.headers.authtoken;
        console.log('token??', token);
        try {
            const user = await admin.auth().verifyIdToken(token, true);
            if (user) {
                const user_id = req.params.user_id;
                const { user_name = '', phone_number = '', email_address = null, password = null, full_name = null, gender = null, date_of_birth = null, address = null, nationality = null, employment_status = null } = req.payload;
                await db.query(
                    `UPDATE users SET user_name='${user_name}',phone_number='${phone_number}',email_address='${email_address}',password='${password}',full_name='${full_name}',gender='${gender}',date_of_birth='${date_of_birth}',address='${address}',nationality='${JSON.stringify(nationality)}',employment_status='${employment_status}' WHERE user_id='${user_id}'`
                )
                const { results } = await db.query(
                    `SELECT * FROM users WHERE user_id='${user_id}'`,
                )
                return results;
            }

        } catch (err) {
            console.log(err);
            throw Boom.unauthorized('Users can only access offers, Please Sign in first');
        }
    }
}
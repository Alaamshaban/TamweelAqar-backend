
import { db } from '../database';
import * as admin from 'firebase-admin';
import Boom from '@hapi/boom';


export const addUser = {
    method: 'POST',
    path: '/api/users',
    options: {
        cors: { origin: ['*'], // an array of origins or 'ignore'    
        credentials: true},
        handler: async (req, h) => {
            const token = req.headers.authtoken;
            console.log('token??', token);
            try {
                const user = await admin.auth().verifyIdToken(token, true);
                if (user) {
                    const { user_name = '', phone_number = '', token = '', user_id = '', email_address = null } = req.payload;
                    console.log(user_id)
                    if (user_id !== null && user_id !== '') {
                        await db.query(
                            `INSERT INTO users (user_name, phone_number,token,user_id,email_address)
                VALUES (?,?,?,?,?);`,
                            [user_name, phone_number, token, user_id, email_address]
                        )
                        const { results } = await db.query(
                            `SELECT * FROM users WHERE user_id='${user_id}'`,
                        )
                        return results;
                    } else {
                        throw Boom.badData('user_id can not be empty');
                    }

                }
            } catch (err) {
                console.log(err);
                throw Boom.unauthorized('Users can only access offers, Please Sign in first');
            }
        }
    }
}
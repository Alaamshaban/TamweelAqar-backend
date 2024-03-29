
import { db } from '../database';
import * as admin from 'firebase-admin';
import Boom from '@hapi/boom';
export const addUser = {
    method: 'POST',
    path: '/api/users',
    handler: async (req, h) => {
        const { user_name = '', full_name = '', phone_number = '', token = '', user_id = '', email_address = null,registered_at='' } = req.payload;
        console.log(user_id, token)
        if (user_id !== null && user_id !== '') {
            await db.query(
                `INSERT INTO users (user_name,full_name, phone_number,token,user_id,email_address,registered_at)
                VALUES (?,?,?,?,?,?,?);`,
                [user_name, full_name, phone_number, token, user_id, email_address,registered_at]
            )
            const { results } = await db.query(
                `SELECT * FROM users WHERE user_id='${user_id}'`,
            )
            return results;
        } else {
            throw Boom.badData('user_id can not be empty');
        }

    }
}
import Boom from '@hapi/boom';
import { db } from '../database';


export const addUser = {
    method: 'POST',
    path: '/api/users',
    handler: async (req, h) => {
        const { user_name = '', phone_number = '', token = '', user_id = '', email = null } = req.payload;
        console.log(user_id)
        if (user_id !== null && user_id !== '') {
            await db.query(
                `INSERT INTO users (user_name, phone_number,token,user_id,email)
                VALUES (?,?,?,?,?);`,
                [user_name, phone_number, token, user_id, email]
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
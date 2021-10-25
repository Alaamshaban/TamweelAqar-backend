import Boom from '@hapi/boom';
import { db } from '../database';


export const addUser = {
    method: 'POST',
    path: '/api/users',
    handler: async (req, h) => {
        console.log(req.payload)
        const { user_name = '', phone_number = '', user_id = '' } = req.payload;
        if (user_id !== null && user_id !== '') {
            await db.query(
                `INSERT IGNORE INTO users (user_name, phone_number,user_id)
                VALUES (?,?,?);`,
                [user_name, phone_number, user_id]
            )
            const { results } = await db.query(
                'SELECT * FROM users'
            )
            const users = results;
            return users;
        } else {
            throw Boom.badData('user_id can not be empty');
        }

    }
}
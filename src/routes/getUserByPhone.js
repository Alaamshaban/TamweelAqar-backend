
import { db } from '../database';
import * as admin from 'firebase-admin';
import Boom from '@hapi/boom';

export const getUserByPhoneNumber = {
    method: 'GET',
    path: '/api/users/phone_number/{number}',
    handler: async (req, h) => {
        const phone_number = req.params.number;
        db.connect();
        const { results } = await db.query(
            'SELECT * FROM users WHERE phone_number=?',
            [phone_number]
        )
        const user = results[0];
        if (!user) {
            throw Boom.notFound(`User is not existing with phone number ${phone_number}`)
        }
        return user;
    }
}
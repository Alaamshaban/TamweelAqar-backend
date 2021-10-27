import { db } from '../database';
import * as admin from 'firebase-admin';
import Boom from '@hapi/boom';

export const getUserOffers = {
    method: 'GET',
    path: '/api/users/{user_id}/offers/',
    handler: async (req, h) => {
        const token = req.headers.authtoken;
        console.log('token??', token);
        try {
            const user = await admin.auth().verifyIdToken(token, true);
            if (user) {
                const { purchase_price, user_salary, down_payment, mortgage_term_length } = req.query;

                const { results } = await db.query('SELECT interest_rate,mortgage_term_length,purchase_price,down_payment,monthly_payment FROM offers');

                for (let i = 0; i < results.length; i++) {
                    const mortgage_amount = results[i].purchase_price * (1 - (results[i].down_payment / 100));
                    console.log(mortgage_amount, results[i].mortgage_term_length, results[i].interest_rate)
                    await db.query(
                        `UPDATE offers SET monthly_payment =
                         ${Math.abs(PMT(results[i].interest_rate / 100 / 12, results[i].mortgage_term_length * 12, mortgage_amount, 0, 0))}
                         WHERE
                         id = ${i + 1};`
                    )
                }
                const x = await db.query(
                    'SELECT * FROM offers',
                );
                return x.results;
            }
            //   throw Boom.unauthorized('Users can only access offers, Please Sign in first');
        } catch (err) {
            console.log(err);
            admin.auth().revokeRefreshTokens
            throw Boom.unauthorized('Users can only access offers, Please Sign in first');
        }

    }
}
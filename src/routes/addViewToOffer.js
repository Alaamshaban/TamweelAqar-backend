import { db } from '../database';
import * as admin from 'firebase-admin';
import Boom from '@hapi/boom';

export const addViewToOffer = {
    method: 'POST',
    path: '/api/offers/{id}/reveal',
    handler: async (req, h) => {
        console.log('///////////////')
        const token = req.headers.authtoken;
        console.log('token????', token);
        const { user_id = '', interest_rate = '', monthly_payment = '', revealed_by = '', admin_fees = '', mortgage_term_length = '', created_at = '',down_payment='' } = req.payload;
        const offer_id = req.params.id;
        try {
            const user = await admin.auth().verifyIdToken(token, true);
            if (user) {
                await db.query(
                    `REPLACE INTO revealed_offers (user_id,interest_rate, monthly_payment,revealed_by,offer_id,admin_fees,created_at,mortgage_term_length,down_payment)
                    VALUES (?,?,?,?,?,?,?,?,?)`,
                    [user_id, interest_rate, monthly_payment, revealed_by, offer_id, admin_fees, created_at, mortgage_term_length,down_payment]
                )
                await db.query(
                    'UPDATE offers SET views=views+1 WHERE id=?',
                    [offer_id]
                )
                const { results } = await db.query(
                    'SELECT * FROM revealed_offers'
                )
                return results;
            }
        } catch (err) {
            console.log(err);
            throw Boom.badRequest('An error accured please try again');
        }
    }
}
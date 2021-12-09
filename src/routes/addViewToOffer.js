import { db } from '../database';
import * as admin from 'firebase-admin';
import Boom from '@hapi/boom';

export const addViewToOffer = {
    method: 'POST',
    path: '/api/offers/{id}/reveal',
    handler: async (req, h) => {
        const token = req.headers.authtoken;
        console.log('token??', token);
        const { user_id = '', interest_rate = '', monthly_payment = '', revealed_by = '' } = req.payload;
        const offer_id = req.params.id;
        try {
            const user = await admin.auth().verifyIdToken(token, true);
            if (user) {
                await db.query(
                    `REPLACE INTO revealed_offers (user_id,interest_rate, monthly_payment,revealed_by,offer_id)
                    VALUES (?,?,?,?,?)`,
                    [user_id, interest_rate, monthly_payment, revealed_by,offer_id]
                )
                await db.query(
                    'UPDATE offers SET views=views+1 WHERE id=?',
                    [offer_id]
                )
                const  {results}  = await db.query(
                    'SELECT * FROM revealed_offers'
                )
                return results;
            }
        } catch (err) {
            console.log(err);
            throw Boom.unauthorized('Users can only access offers, Please Sign in first');
        }
    }
}
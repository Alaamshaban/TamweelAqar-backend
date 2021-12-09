
import { db } from '../database';
import * as admin from 'firebase-admin';
import Boom from '@hapi/boom';

export const updateUserLastSearch = {
    method: 'POST',
    path: '/api/users/userhistory',
    handler: async (req, h) => {
        const token = req.headers.authtoken;
        console.log('token??', token);
        const { user_id = '', property_area = '', purchase_price = '', user_down_payment = '', user_mortgage_term_length = '', user_salary = null, eligible_offers = null, not_eligible_offers = null } = req.payload;
        try {
            const user = await admin.auth().verifyIdToken(token, true);
            if (user) {
                await db.query(
                    `INSERT INTO user_history (user_id,property_area, purchase_price,user_down_payment,user_mortgage_term_length,user_salary,eligible_offers,not_eligible_offers)
                    VALUES (?,?,?,?,?,?,?,?)`,
                    [user_id, property_area, purchase_price, user_down_payment, user_mortgage_term_length, user_salary, eligible_offers, not_eligible_offers]
                )
                // remove duplicates form user_history table
                await db.query(`DELETE t1 FROM user_history t1 INNER JOIN user_history t2 WHERE
                t1.id > t2.id AND
                t1.user_id = t2.user_id AND
                t1.property_area = t2.property_area AND
                t1.purchase_price=t2.purchase_price AND
                t1.user_mortgage_term_length=t2.user_mortgage_term_length AND 
                t1.user_down_payment=t2.user_down_payment`)
                return 'ok';
            }

        } catch (err) {
            console.log(err);
            throw Boom.unauthorized('Users can only access offers, Please Sign in first');
        }
    }
}
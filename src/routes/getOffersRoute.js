import { Offers } from "./offers";
import { db } from '../database';
import PMT from 'formula-pmt';

export const getOffersRoute = {
    method: 'GET',
    path: '/api/offers/',
    handler: async (req, h) => {
        //  return Offers;
        const { purchase_price, user_salary, user_down_payment, user_mortgage_term_length } = req.query;

        const { results } = await db.query('SELECT interest_rate,required_payment_to_salary_ratio FROM offers');
        const mortgage_amount = purchase_price * (1 - (user_down_payment / 100));
        for (let i = 0; i < results.length; i++) {
            await db.query(
                `UPDATE offers SET monthly_payment =
                 ${Math.abs(PMT(results[i].interest_rate / 100 / 12, user_mortgage_term_length * 12, mortgage_amount, 0, 0))}
                 WHERE
                 id = ${i + 1};`
            )
        }

        await db.query(`UPDATE offers SET required_salary=monthly_payment/(required_payment_to_salary_ratio/100)`);

        const eligible = await db.query(
            `SELECT * FROM offers WHERE down_payment<=${user_down_payment} AND required_salary<=${user_salary} AND mortgage_term_length>=${user_mortgage_term_length}`
        );
        const not_eligible = await db.query(
            `SELECT * FROM offers WHERE down_payment>${user_down_payment} OR required_salary>${user_salary} OR mortgage_term_length<${user_mortgage_term_length}`
        )

        return {
            'eligible': eligible.results,
            'not_eligible': not_eligible.results
        };
    }
}
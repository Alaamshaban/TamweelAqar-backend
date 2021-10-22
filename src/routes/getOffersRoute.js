import { Offers } from "./offers";
import {db} from '../database';

export const getOffersRoute = {
    method: 'GET',
    path: '/api/offers',
    handler:async (req, h) => {
        //  return Offers;

        const { results } = await db.query(
            'SELECT * FROM offers'
        );
        return results;
    }
}

import Boom from '@hapi/boom';
import { db } from '../database';

export const getIndividualOfferRoute = {
    method: 'GET',
    path: '/api/offers/{id}',
    handler: async (req, h) => {
        const id = req.params.id;
        console.log(id)
        //   const offer = Offers.find(offer => offer.id === id);
        const { results } = await db.query(
            'SELECT * FROM offers WHERE id=?',
            [id]
        )
        const offer = results[0];
        if (!offer) {
            throw Boom.notFound(`Offer is not existing with id ${id}`)
        }
        return offer;
    }
}
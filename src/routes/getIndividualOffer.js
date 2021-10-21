import { Offers } from "./offers";
import Boom from '@hapi/boom';

export const getOfferRoute = {
    method: 'GET',
    path: '/api/offers/{id}',
    handler: (req, h) => {
        const id = req.params.id;
        const offer = Offers.find(offer => offer.id === id);
        if (!offer) {
            throw Boom.notFound(`Offer is not existing with id ${id}`)
        }
        return offer;
    }
}
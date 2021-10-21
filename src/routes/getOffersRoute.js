import { Offers } from "./offers";

export const getOffersRoute = {
    method: 'GET',
    path: '/api/offers',
    handler: (req, h) => {
        return Offers;
    }
}
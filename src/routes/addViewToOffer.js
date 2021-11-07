import { db } from '../database';


export const addViewToOffer = {
    method: 'PUT',
    path: '/api/offers/{id}/add-view',
    options: {
        cors: {
            origin: ['*'], // an array of origins or 'ignore'    
            credentials: true
        },
        handler: async (req, h) => {
            const id = req.params.id;
            await db.query(
                'UPDATE offers SET views=views+1 WHERE id=?',
                [id]
            )
            const { results } = await db.query(
                'SELECT * FROM offers WHERE id=?',
                [id]
            )
            const updatedOffer = results[0];
            return updatedOffer;
        }
    }
}
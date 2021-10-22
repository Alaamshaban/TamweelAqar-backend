import { db } from '../database';

export const getUserOffers = {
    method: 'GET',
    path: '/api/users/{user_id}/offers',
    handler: async (req, h) => {
        const user_id = req.params.user_id;

        const { results } = await db.query(
            'SELECT * FROM offers WHERE user_id=?',
            [user_id]
        );

        return results;

    }
}
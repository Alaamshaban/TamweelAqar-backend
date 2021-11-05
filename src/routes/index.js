import { addViewToOffer } from "./addViewToOffer";
import { getIndividualOfferRoute } from "./getIndividualOffer";
import { getUser } from "./getUser";
import { getUserOffers } from "./getUserOffers";
import { addUser } from "./postUser";
import { updateUser } from "./updateUser";

export default[
    getIndividualOfferRoute,
    addViewToOffer,
    getUserOffers,
    addUser,
    updateUser,
    getUser
];
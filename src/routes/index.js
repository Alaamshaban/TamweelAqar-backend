import { addViewToOffer } from "./addViewToOffer";
import { getOfferRoute } from "./getIndividualOffer";
import { getOffersRoute } from "./getOffersRoute"
import { getUserOffers } from "./getUserOffers";
import { addUser } from "./postUser";

export default[
    getOffersRoute,
    getOfferRoute,
    addViewToOffer,
    getUserOffers,
    addUser
];
import { addViewToOffer } from "./addViewToOffer";
import { getOfferRoute } from "./getIndividualOffer";
import { getOffersRoute } from "./getOffersRoute"
import { getUserOffers } from "./getUserOffers";

export default[
    getOffersRoute,
    getOfferRoute,
    addViewToOffer,
    getUserOffers
];
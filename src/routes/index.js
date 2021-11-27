import { addViewToOffer } from "./addViewToOffer";
import { getIndividualOfferRoute } from "./getIndividualOffer";
import { getUser } from "./getUser";
import { getUserByPhoneNumber } from "./getUserByPhone";
import { getUserHistory } from "./getUserHistory";
import { getUserOffers } from "./getUserOffers";
import { addUser } from "./postUser";
import { updateUser } from "./updateUser";
import { updateUserLastSearch } from "./updateUserLastSearch";

export default[
    getIndividualOfferRoute,
    addViewToOffer,
    getUserOffers,
    addUser,
    updateUser,
    getUser,
    getUserByPhoneNumber,
    updateUserLastSearch,
    getUserHistory
];
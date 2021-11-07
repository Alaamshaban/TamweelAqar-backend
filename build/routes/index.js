"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _addViewToOffer = require("./addViewToOffer");

var _getIndividualOffer = require("./getIndividualOffer");

var _getUser = require("./getUser");

var _getUserOffers = require("./getUserOffers");

var _postUser = require("./postUser");

var _updateUser = require("./updateUser");

var _default = [_getIndividualOffer.getIndividualOfferRoute, _addViewToOffer.addViewToOffer, _getUserOffers.getUserOffers, _postUser.addUser, _updateUser.updateUser, _getUser.getUser];
exports["default"] = _default;
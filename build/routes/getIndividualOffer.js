"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIndividualOfferRoute = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _offers = require("./offers");

var _boom = _interopRequireDefault(require("@hapi/boom"));

var _database = require("../database");

var getIndividualOfferRoute = {
  method: 'GET',
  path: '/api/offers/{id}',
  handler: function () {
    var _handler = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, h) {
      var id, _yield$db$query, results, offer;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              id = req.params.id;
              console.log(id); //   const offer = Offers.find(offer => offer.id === id);

              _context.next = 4;
              return _database.db.query('SELECT * FROM offers WHERE id=?', [id]);

            case 4:
              _yield$db$query = _context.sent;
              results = _yield$db$query.results;
              offer = results[0];

              if (offer) {
                _context.next = 9;
                break;
              }

              throw _boom["default"].notFound("Offer is not existing with id ".concat(id));

            case 9:
              return _context.abrupt("return", offer);

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function handler(_x, _x2) {
      return _handler.apply(this, arguments);
    }

    return handler;
  }()
};
exports.getIndividualOfferRoute = getIndividualOfferRoute;
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addViewToOffer = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _database = require("../database");

var addViewToOffer = {
  method: 'PUT',
  path: '/api/offers/{id}/add-view',
  handler: function () {
    var _handler = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, h) {
      var id, _yield$db$query, results, updatedOffer;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              id = req.params.id;
              _context.next = 3;
              return _database.db.query('UPDATE offers SET views=views+1 WHERE id=?', [id]);

            case 3:
              _context.next = 5;
              return _database.db.query('SELECT * FROM offers WHERE id=?', [id]);

            case 5:
              _yield$db$query = _context.sent;
              results = _yield$db$query.results;
              updatedOffer = results[0];
              return _context.abrupt("return", updatedOffer);

            case 9:
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
exports.addViewToOffer = addViewToOffer;
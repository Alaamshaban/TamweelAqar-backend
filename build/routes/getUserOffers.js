"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserOffers = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _database = require("../database");

var admin = _interopRequireWildcard(require("firebase-admin"));

var _boom = _interopRequireDefault(require("@hapi/boom"));

var _formulaPmt = _interopRequireDefault(require("formula-pmt"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var getUserOffers = {
  method: 'GET',
  path: '/api/users/{user_id}/offers/',
  handler: function () {
    var _handler = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, h) {
      var token, user, _req$query, purchase_price, user_salary, user_down_payment, user_mortgage_term_length, _yield$db$query, results, mortgage_amount, i, eligible, not_eligible;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              token = req.headers.authtoken;
              console.log('token??', token);
              _context.prev = 2;
              _context.next = 5;
              return admin.auth().verifyIdToken(token, true);

            case 5:
              user = _context.sent;

              if (!user) {
                _context.next = 29;
                break;
              }

              _req$query = req.query, purchase_price = _req$query.purchase_price, user_salary = _req$query.user_salary, user_down_payment = _req$query.user_down_payment, user_mortgage_term_length = _req$query.user_mortgage_term_length;
              _context.next = 10;
              return _database.db.query('SELECT interest_rate,required_payment_to_salary_ratio FROM offers');

            case 10:
              _yield$db$query = _context.sent;
              results = _yield$db$query.results;
              mortgage_amount = purchase_price * (1 - user_down_payment / 100);
              i = 0;

            case 14:
              if (!(i < results.length)) {
                _context.next = 20;
                break;
              }

              _context.next = 17;
              return _database.db.query("UPDATE offers SET monthly_payment =\n                         ".concat(Math.abs((0, _formulaPmt["default"])(results[i].interest_rate / 100 / 12, user_mortgage_term_length * 12, mortgage_amount, 0, 0)), "\n                         WHERE\n                         id = ").concat(i + 1, ";"));

            case 17:
              i++;
              _context.next = 14;
              break;

            case 20:
              _context.next = 22;
              return _database.db.query("UPDATE offers SET required_salary=monthly_payment/(required_payment_to_salary_ratio/100)");

            case 22:
              _context.next = 24;
              return _database.db.query("SELECT * FROM offers WHERE down_payment<=".concat(user_down_payment, " AND required_salary<=").concat(user_salary, " AND mortgage_term_length>=").concat(user_mortgage_term_length));

            case 24:
              eligible = _context.sent;
              _context.next = 27;
              return _database.db.query("SELECT * FROM offers WHERE down_payment>".concat(user_down_payment, " OR required_salary>").concat(user_salary, " OR mortgage_term_length<").concat(user_mortgage_term_length));

            case 27:
              not_eligible = _context.sent;
              return _context.abrupt("return", {
                'eligible': eligible.results,
                'not_eligible': not_eligible.results
              });

            case 29:
              _context.next = 35;
              break;

            case 31:
              _context.prev = 31;
              _context.t0 = _context["catch"](2);
              console.log(_context.t0);
              throw _boom["default"].unauthorized('Users can only access offers, Please Sign in first');

            case 35:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[2, 31]]);
    }));

    function handler(_x, _x2) {
      return _handler.apply(this, arguments);
    }

    return handler;
  }()
};
exports.getUserOffers = getUserOffers;
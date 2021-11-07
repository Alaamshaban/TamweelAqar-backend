"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addUser = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _database = require("../database");

var admin = _interopRequireWildcard(require("firebase-admin"));

var _boom = _interopRequireDefault(require("@hapi/boom"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var addUser = {
  method: 'POST',
  path: '/api/users',
  handler: function () {
    var _handler = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, h) {
      var token, user, _req$payload, _req$payload$user_nam, user_name, _req$payload$phone_nu, phone_number, _req$payload$token, _token, _req$payload$user_id, user_id, _req$payload$email_ad, email_address, _yield$db$query, results;

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
                _context.next = 20;
                break;
              }

              _req$payload = req.payload, _req$payload$user_nam = _req$payload.user_name, user_name = _req$payload$user_nam === void 0 ? '' : _req$payload$user_nam, _req$payload$phone_nu = _req$payload.phone_number, phone_number = _req$payload$phone_nu === void 0 ? '' : _req$payload$phone_nu, _req$payload$token = _req$payload.token, _token = _req$payload$token === void 0 ? '' : _req$payload$token, _req$payload$user_id = _req$payload.user_id, user_id = _req$payload$user_id === void 0 ? '' : _req$payload$user_id, _req$payload$email_ad = _req$payload.email_address, email_address = _req$payload$email_ad === void 0 ? null : _req$payload$email_ad;
              console.log(user_id);

              if (!(user_id !== null && user_id !== '')) {
                _context.next = 19;
                break;
              }

              _context.next = 12;
              return _database.db.query("INSERT INTO users (user_name, phone_number,token,user_id,email_address)\n                VALUES (?,?,?,?,?);", [user_name, phone_number, _token, user_id, email_address]);

            case 12:
              _context.next = 14;
              return _database.db.query("SELECT * FROM users WHERE user_id='".concat(user_id, "'"));

            case 14:
              _yield$db$query = _context.sent;
              results = _yield$db$query.results;
              return _context.abrupt("return", results);

            case 19:
              throw _boom["default"].badData('user_id can not be empty');

            case 20:
              _context.next = 26;
              break;

            case 22:
              _context.prev = 22;
              _context.t0 = _context["catch"](2);
              console.log(_context.t0);
              throw _boom["default"].unauthorized('Users can only access offers, Please Sign in first');

            case 26:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[2, 22]]);
    }));

    function handler(_x, _x2) {
      return _handler.apply(this, arguments);
    }

    return handler;
  }()
};
exports.addUser = addUser;
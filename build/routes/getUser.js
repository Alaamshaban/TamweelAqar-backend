"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUser = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _database = require("../database");

var admin = _interopRequireWildcard(require("firebase-admin"));

var _boom = _interopRequireDefault(require("@hapi/boom"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var getUser = {
  method: 'GET',
  path: '/api/users/{user_id}',
  handler: function () {
    var _handler = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, h) {
      var token, user, user_id, _yield$db$query, results, _user;

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
                _context.next = 17;
                break;
              }

              user_id = req.params.user_id;
              console.log(user_id);
              _context.next = 11;
              return _database.db.query('SELECT * FROM users WHERE user_id=?', [user_id]);

            case 11:
              _yield$db$query = _context.sent;
              results = _yield$db$query.results;
              _user = results[0];

              if (_user) {
                _context.next = 16;
                break;
              }

              throw _boom["default"].notFound("User is not existing with id ".concat(user_id));

            case 16:
              return _context.abrupt("return", _user);

            case 17:
              _context.next = 23;
              break;

            case 19:
              _context.prev = 19;
              _context.t0 = _context["catch"](2);
              console.log(_context.t0);
              throw _boom["default"].unauthorized('Users can only access offers, Please Sign in first');

            case 23:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[2, 19]]);
    }));

    function handler(_x, _x2) {
      return _handler.apply(this, arguments);
    }

    return handler;
  }()
};
exports.getUser = getUser;
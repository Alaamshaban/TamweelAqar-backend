"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUser = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _database = require("../database");

var admin = _interopRequireWildcard(require("firebase-admin"));

var _boom = _interopRequireDefault(require("@hapi/boom"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var updateUser = {
  method: 'PUT',
  path: '/api/users/{user_id}',
  handler: function () {
    var _handler = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, h) {
      var token, user, user_id, _req$payload, _req$payload$user_nam, user_name, _req$payload$phone_nu, phone_number, _req$payload$email_ad, email_address, _req$payload$password, password, _req$payload$full_nam, full_name, _req$payload$gender, gender, _req$payload$date_of_, date_of_birth, _req$payload$address, address, _req$payload$national, nationality, _req$payload$employme, employment_status, _yield$db$query, results;

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
                _context.next = 16;
                break;
              }

              user_id = req.params.user_id;
              _req$payload = req.payload, _req$payload$user_nam = _req$payload.user_name, user_name = _req$payload$user_nam === void 0 ? '' : _req$payload$user_nam, _req$payload$phone_nu = _req$payload.phone_number, phone_number = _req$payload$phone_nu === void 0 ? '' : _req$payload$phone_nu, _req$payload$email_ad = _req$payload.email_address, email_address = _req$payload$email_ad === void 0 ? null : _req$payload$email_ad, _req$payload$password = _req$payload.password, password = _req$payload$password === void 0 ? null : _req$payload$password, _req$payload$full_nam = _req$payload.full_name, full_name = _req$payload$full_nam === void 0 ? null : _req$payload$full_nam, _req$payload$gender = _req$payload.gender, gender = _req$payload$gender === void 0 ? null : _req$payload$gender, _req$payload$date_of_ = _req$payload.date_of_birth, date_of_birth = _req$payload$date_of_ === void 0 ? null : _req$payload$date_of_, _req$payload$address = _req$payload.address, address = _req$payload$address === void 0 ? null : _req$payload$address, _req$payload$national = _req$payload.nationality, nationality = _req$payload$national === void 0 ? null : _req$payload$national, _req$payload$employme = _req$payload.employment_status, employment_status = _req$payload$employme === void 0 ? null : _req$payload$employme;
              _context.next = 11;
              return _database.db.query("UPDATE users SET user_name='".concat(user_name, "',phone_number='").concat(phone_number, "',email_address='").concat(email_address, "',password='").concat(password, "',full_name='").concat(full_name, "',gender='").concat(gender, "',date_of_birth='").concat(date_of_birth, "',address='").concat(address, "',nationality='").concat(JSON.stringify(nationality), "',employment_status='").concat(employment_status, "' WHERE user_id='").concat(user_id, "'"));

            case 11:
              _context.next = 13;
              return _database.db.query("SELECT * FROM users WHERE user_id='".concat(user_id, "'"));

            case 13:
              _yield$db$query = _context.sent;
              results = _yield$db$query.results;
              return _context.abrupt("return", results);

            case 16:
              _context.next = 22;
              break;

            case 18:
              _context.prev = 18;
              _context.t0 = _context["catch"](2);
              console.log(_context.t0);
              throw _boom["default"].unauthorized('Users can only access offers, Please Sign in first');

            case 22:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[2, 18]]);
    }));

    function handler(_x, _x2) {
      return _handler.apply(this, arguments);
    }

    return handler;
  }()
};
exports.updateUser = updateUser;
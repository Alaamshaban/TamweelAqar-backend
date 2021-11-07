"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _hapi = _interopRequireDefault(require("@hapi/hapi"));

var _routes = _interopRequireDefault(require("./routes"));

var admin = _interopRequireWildcard(require("firebase-admin"));

var _database = require("./database");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//import credentials from '../cred.json';
admin.initializeApp({
  credential: admin.credential.cert('credentials')
});
var myServer;

var start = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            myServer = _hapi["default"].server({
              port: process.env.PORT || 1337,
              host: '0.0.0.0'
            });

            _routes["default"].forEach(function (route) {
              myServer.route(route);
            });

            _database.db.connect(); // server.route
            //     ([
            //         {
            //             method: 'GET',
            //             path: '/hello',
            //             handler: (req, h) => {
            //                 // return h.response('Hello!').code(201);
            //                 return 'Hello!';
            //             }
            //         },
            //         {
            //             method: 'POST',
            //             path: '/hello/post',
            //             handler: (req, h) => {
            //                 const payload = req.payload;
            //                 // return h.response('Hello!').code(201);
            //                 return `Hello ${payload.name}!`;
            //             }
            //         }
            //     ]
            //     )


            _context.next = 5;
            return myServer.start();

          case 5:
            console.log("server is listening on ".concat(myServer.info.uri));

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function start() {
    return _ref.apply(this, arguments);
  };
}();

process.on('unhandledRejection', function (err) {
  console.log(err);
  process.exit(1);
});
process.on('SIGINT', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
  return _regenerator["default"].wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          console.log('Stopping Server...');
          _context2.next = 3;
          return myServer.stop({
            timeout: 1000
          });

        case 3:
          _database.db.end();

          console.log('Server stopped');
          process.exit(0);

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2);
})));
start();
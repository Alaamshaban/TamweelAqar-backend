"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.db = void 0;

var _mysql = _interopRequireDefault(require("mysql"));

var connection = _mysql["default"].createConnection({
  host: 'remotemysql.com',
  user: '841ZEBGTq7',
  password: 'h8utPlWg1H',
  database: '841ZEBGTq7'
});

var db = {
  connect: function connect() {
    return connection.connect();
  },
  query: function query(querystring, escapedValues) {
    return new Promise(function (resolve, reject) {
      connection.query(querystring, escapedValues, function (error, results, fields) {
        if (error) reject(error);
        resolve({
          results: results,
          fields: fields
        });
      });
    });
  },
  end: function end() {
    return connection.end();
  }
};
exports.db = db;
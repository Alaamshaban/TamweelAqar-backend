const AdminBroPlugin = require('admin-bro-hapijs')
const AdminBro = require('admin-bro')
const AdminBroSequelize = require('@admin-bro/sequelize')
const Hapi = require('hapi');
const { Sequelize, Model, DataTypes } = require('sequelize');
import { db } from './database';
import { UserModel } from './models/user.model';

AdminBro.registerAdapter(AdminBroSequelize)
// const sequelize = new Sequelize('sqlite::memory:');
const myDB = new Sequelize('841ZEBGTq7', '841ZEBGTq7', 'h8utPlWg1H', {
  host: 'remotemysql.com',
  dialect: 'mysql'
});
db.connect();

const User = myDB.define('user', {...UserModel}, {
  timestamps: false
});

const adminBroOptions = {
  database: [myDB],
  resources: [User]

}

const server = Hapi.server({ port: process.env.PORT || 4300 })
const start = async () => {
  await server.register({
    plugin: AdminBroPlugin,
    options: adminBroOptions,
  })

  await server.start()
}

start()
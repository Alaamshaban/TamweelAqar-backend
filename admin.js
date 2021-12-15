const AdminBroPlugin = require('admin-bro-hapijs')
const AdminBro = require('admin-bro')
const AdminBroSequelize = require('@admin-bro/sequelize')
const Hapi = require('hapi');
const { Sequelize, Model, DataTypes } = require('sequelize');
import { db } from './src/database';
import { UserModel } from './src/models/user.model';
import { UserHistoryModel } from './src/models/user-history.model'
import { RevealedOfferModel } from './src/models/revealed-offers.mode';
import { OfferModel } from './src/models/offer.model';

AdminBro.registerAdapter(AdminBroSequelize)

const ADMIN = {
  email: 'text@example.com',
  password: 'password',
}

const myDB = new Sequelize('841ZEBGTq7', '841ZEBGTq7', 'h8utPlWg1H', {
  host: 'remotemysql.com',
  dialect: 'mysql'
});
db.connect();

const User = myDB.define('user', { ...UserModel }, {
  timestamps: false,
  tableName: 'users'
});

const UserHistory = myDB.define('user_history', { ...UserHistoryModel }, {
  timestamps: false,
  tableName: 'user_history',
});

const RevealedOffer = myDB.define('revealed_offers', { ...RevealedOfferModel }, {
  timestamps: false,
  tableName: 'revealed_offers',
});

const Offer = myDB.define('offers', { ...OfferModel }, {
  timestamps: false,
  tableName: 'offers',
});

User.hasOne(UserHistory, { foreignKey: 'user_id', as: 'user_history', sourceKey: 'user_id' });
User.hasOne(RevealedOffer, { foreignKey: 'user_id', as: 'revealed_offer', sourceKey: 'user_id' });

const findAllWithHistory = async () => {
  let users = await User.findAll({
    include: [
      { model: UserHistory, as: 'user_history' },
      { model: RevealedOffer, as: 'revealed_offer' }
    ]
  });

  users.map(user => {
    if (user.user_history) {
      User.update({
        purchase_price: user.user_history.purchase_price,
        property_area: user.user_history.property_area,
        last_mortgage_amount: user.user_history.user_down_payment,
      }, { where: { user_id: user.user_id } });
    }
    if (user.revealed_offer) {
      User.update({
        last_monthly_interest_rate: user.revealed_offer.interest_rate,
        last_monthly_payment: user.revealed_offer.monthly_payment
      }, { where: { user_id: user.user_id } });
    }
  });
}


const adminBroOptions = {
  database: [myDB],
  auth: {
    authenticate: (email, password) => {
      if (ADMIN.email === email && ADMIN.password === password) {
        return ADMIN
      }
      return null
    },
    strategy: 'session',
    cookieName: 'adminBroCookie',
    cookiePassword: process.env.COOKIE_PASSWORD || '123456789123456789123456789123456789',
    isSecure: true, //only https requests
  },
  resources: [{
    resource: User,
    options: {
      properties:{
      full_name: { isVisible: { list: true, filter: true, show: true, edit: false } },
      phone_number: { isVisible: { list: true, filter: true, show: true, edit: false } },
      purchase_price:{ isVisible: { list: true, filter: true, show: true, edit: false } },
      property_area:{ isVisible: { list: true, filter: true, show: true, edit: false } },
      last_mortgage_amount:{ isVisible: { list: true, filter: true, show: true, edit: false } },
      last_monthly_interest_rate:{ isVisible: { list: true, filter: true, show: true, edit: false } },
      last_monthly_payment:{ isVisible: { list: true, filter: true, show: true, edit: false } },
       user_id:{ isVisible: { list: true, filter: true, show: true, edit: false } }
      }
  }
},
    {resource:Offer},
    UserHistory],
  branding: {
    //   logo: 'URL_TO_YOUR_LOGO',
    companyName: 'TamweelAkar',
    softwareBrothers: false   // if Software Brothers logos should be shown in the sidebar footer
  },

}

findAllWithHistory();


const server = Hapi.server({ port: process.env.PORT || 4300 })
const start = async () => {
  await server.register({
    plugin: AdminBroPlugin,
    options: adminBroOptions,
  })

  await server.start()
}

start()
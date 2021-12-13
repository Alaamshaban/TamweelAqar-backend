import Hapi from '@hapi/hapi';
import routes from './routes';
import * as admin from 'firebase-admin';
import credentials from '../google-credentials.json';
import { db } from './database';



admin.initializeApp({
    credential: admin.credential.cert(credentials)
});

let myServer;

const start = async () => {
    myServer = Hapi.server({
        port: process.env.PORT || 5000,
        routes: {
            cors: {
                origin: ['*'], // an array of origins or 'ignore'
                additionalHeaders: ['AuthToken', 'Access-Control-Allow-Headers', 'Access-Control-Allow-Credentials', 'X-Requested-With', 'content-type'], // an array of additional exposed headers
            }
        }
    });
    await myServer.register({
        plugin: AdminBroPlugin,
        options: adminBroOptions,
      })
    routes.push({
        method: 'GET',
        path: '/',
        handler: (req, h) => {
        // return h.response('Hello!').code(201);
        return h.redirect('https://tamweelaqar-fe.herokuapp.com/home');
        }
    })

    routes.forEach(route => {
        myServer.route(route);
    });

    db.connect();
    

    await myServer.start();
    console.log(`server is listening on ${myServer.info.uri}`);

}



process.on('unhandledRejection', err => {
    console.log(err);
});
process.on('unhandledException', err => {
    console.log(err);
});

    // restart server every 2 min
    setInterval(() => {
        db.handleDisconnect();
    }, 120000)


    /// admin.js


    const AdminBroPlugin = require('admin-bro-hapijs')
    const AdminBro = require('admin-bro')
    const AdminBroSequelize = require('@admin-bro/sequelize')
    const { Sequelize, Model, DataTypes } = require('sequelize');
    import { UserModel } from './models/user.model';
    import { UserHistoryModel } from './models/user-history.model'
    import { RevealedOfferModel } from './models/revealed-offers.mode';
    import { OfferModel } from './models/offer.model';
    
    AdminBro.registerAdapter(AdminBroSequelize)
    
    const ADMIN = {
      email: 'text@example.com',
      password: 'password',
    }
    
    const myDB = new Sequelize('841ZEBGTq7', '841ZEBGTq7', 'h8utPlWg1H', {
      host: 'remotemysql.com',
      dialect: 'mysql'
    });
    
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
        {resource:Offer}],
      branding: {
        //   logo: 'URL_TO_YOUR_LOGO',
        companyName: 'TamweelAkar',
        softwareBrothers: false   // if Software Brothers logos should be shown in the sidebar footer
      },
    
    }
    
    findAllWithHistory();
    
process.on('SIGINT', async () => {
    console.log('Stopping Server...');
    await myServer.stop({ timeout: 1000 });
    db.end();
    console.log('Server stopped');
    process.exit(0);
})
start();
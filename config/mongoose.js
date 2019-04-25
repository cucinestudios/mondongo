/**
 * Mondongo
 */

'use strict';

const env = require('simpledot');
const Bb = require('bluebird');
const mongoose = require('mongoose');

const DEVELOP_DB_URL = 'mongodb://'+env.DEV_DB_USER+':'+env.DEV_DB_PASS+'@'+env.DEV_DB_HOST+':'+env.DEV_DB_PORT+'/'+env.DEV_DB_NAME;
const DB_URL = 'mongodb://'+env.DB_USER+':'+env.DB_PASS+'@'+env.DB_HOST+':'+env.DB_PORT+'/'+env.DB_NAME;

mongoose.Promise = Bb;
mongoose.connect(process.env.NODE_ENV === 'production' ? DB_URL : DEVELOP_DB_URL, { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', () => {
  console.log('connected to db.');
})
connection.on('error', (err) => {
  console.log(`connection error: ${err.message}`);
})

module.exports = mongoose
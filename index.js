'use strict'

const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config');

mongoose.Promise = global.Promise;
mongoose.connect(config.db, {
  useMongoClient: true
}, (err, res) => {
  if (err)
    return console.log('ERROR: failed connection to server');
  else
    console.log('DB ready connection');

  app.listen(config.port, () => {
    console.log(`Services run in http://localhost:${config.port}`);
  })
})

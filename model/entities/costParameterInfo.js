'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const costParameterSchema = new schema({
  country: {
    type: String,
    lowercase: true
  },
  operatorName: String,
  costForSecond: Number,
  rechargeObjs: [{ type: schema.Types.ObjectId, ref: 'rechargeInfo' }],
});

module.exports = mongoose.model('costParameterInfo', costParameterSchema);

'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const rechargeSchema = new schema({
  numberCellphone: {
    type: Number,
    unique: true
  },
  userRechargeId: String,
  moneyInAccount: Number,
  costParameterId: { type: schema.Types.ObjectId, ref: 'costParameterInfo' },
  costParameterObjs: [{ type: schema.Types.ObjectId, ref: 'costParameterInfo' }]
});

module.exports = mongoose.model('rechargeInfo', rechargeSchema);

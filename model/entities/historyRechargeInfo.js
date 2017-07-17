'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const historyRechargeSchema = new schema({
  numberCellphone: Number,
  dateRecharge: {
    type: Date,
    default: Date.now()
  },
});

module.exports = mongoose.model('historyRechargeInfo', historyRechargeSchema);

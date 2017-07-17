'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const historyConsumptionSchema = new schema({
  numberCellphone: Number,
  dateCall: {
    type: Date,
    default: Date.now()
  },
});

module.exports = mongoose.model('historyConsumptionInfo', historyConsumptionSchema);

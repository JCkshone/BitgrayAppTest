'use strict'

const factory = require('../model/bussines');

function ModifyMoneyInAccount(req, res) {
  factory.consumption.ModifyMoneyInAccount(req.body.numberCellphone, req.body.seconds).then((value) => {
    res.status(201).send(value);
  }, (reason) => {
    if (reason.devMessage !== undefined) {
      return res.status(500).send(reason);
    } else
      return res.status(404).send('not found');
  });
}

module.exports = {
  ModifyMoneyInAccount
};

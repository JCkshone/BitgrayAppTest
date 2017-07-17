'use strict'

const factory = require('../model/bussines');


function PhoneRecharge(req, res) {
  debugger;
  let response = {};
  let obj = {
    numberCellphone: req.body.numberCellphone === undefined || req.body.numberCellphone === null ?
      '' : req.body.numberCellphone,
    userRechargeId: req.body.userRechargeId === undefined || req.body.userRechargeId === null ?
      '' : req.body.userRechargeId,
    costParameterId: req.body.costParameterId === undefined || req.body.costParameterId === null ?
      '' : req.body.costParameterId,
    moneyInAccount: req.body.moneyInAccount === undefined || req.body.moneyInAccount === null ?
      '' : req.body.moneyInAccount
  };
  debugger;
  if (obj.numberCellphone === '' || obj.userRechargeId === '' || obj.costParameterId === '' || obj.moneyInAccount === '') {
    console.log(obj);
    return res.status(403).send({
      message: 'You need every property for recharge you cellphone'
    });
  }

  debugger;
  factory.recharge.PhoneRecharge(obj).then((value) => {
    res.status(201).send(value);
  }, (reason) => {
    if (reason.devMessage !== undefined) {
      return res.status(500).send(reason);
    } else
      return res.status(404).send('not found');
  });

}

function ReturnRechargeInfo(req, res) {
  debugger;
  factory.recharge.ReturnCellphoneInfo(req.headers.numbercellphone, req.headers.costParameterId).then((value) => {
    debugger;
    res.status(201).send(value);
  }, (reason) => {
    if (reason.devMessage !== undefined) {
      return res.status(500).send(reason);
    } else
      return res.status(404).send('not found');
  });
}

module.exports = {
  PhoneRecharge,
  ReturnRechargeInfo
};

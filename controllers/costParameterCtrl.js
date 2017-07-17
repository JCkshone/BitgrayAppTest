'use strict'

const factory = require('../model/bussines');

function CreateCostsParameter(req, res) {
  let response = {};
  let obj = {
    country: req.body.country === undefined || req.body.country === null ?
      '' : req.body.country,
    operatorName: req.body.operatorName === undefined || req.body.operatorName === null ?
      '' : req.body.operatorName,
    costForSecond: req.body.costForSecond === undefined || req.body.costForSecond === null ?
      '' : req.body.costForSecond
  };
  if (obj.country === '' || obj.operatorName === '' || obj.costForSecond === '') {
    return res.status(403).send({
      message: 'You need every property for create a new cost'
    });
  }

  factory.costParameter.CreateCostsParameter(obj).then((value) => {
    res.status(201).send(value);
  }, (reason) => {
    if (reason.devMessage !== undefined) {
      return res.status(500).send(reason);
    } else
      return res.status(404).send('not found');
  });

}

function UpdateCostParameter(req, res) {
  factory.costParameter.UpdateCostParameter(req.body).then((value) => {
    res.status(200).send(value);
  }, (reason) => {
    if (reason.devMessage !== undefined) {
      return res.status(500).send(reason);
    } else
      return res.status(404).send('not found');
  })
}

function ReturnCostsParameter(req, res) {
  factory.costParameter.GetCostsParameter().then((value) => {
    res.status(200).send(value);
  }, (reason) => {
    if (reason.devMessage !== undefined) {
      return res.status(500).send(reason)
    } else
      return res.status(404).send('not found');
  });
}

function RemoveCostParameter(req, res) {
  factory.costParameter.DeleteCostParameter(req.body.costParameterId).then((value) => {
    debugger;
    if (value.response.result.n === 1)
      res.status(200).send({
        message: value.message
      });
    else
      res.status(403).send({
        message: 'resource no find for delete'
      });

  }, (reason) => {
    if (reason.devMessage !== undefined) {
      return res.status(500).send(reason)
    } else {
      return res.status(404).send('not found');
    }
  });
}



module.exports = {
  CreateCostsParameter,
  UpdateCostParameter,
  ReturnCostsParameter,
  RemoveCostParameter
};

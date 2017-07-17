'use strict'

const express = require('express');
const {user} = require('../model/bussines');
const factory = require('../controllers');

const api = express.Router();

//rest for users
api.post('/user/register', user.usrCreate);

//rest for info costs parameter
api.post('/costParameter/newCost', factory.costParameterCtrl.CreateCostsParameter);
api.get('/costParameter/getCosts', factory.costParameterCtrl.ReturnCostsParameter);
api.post('/costParameter/removeCost', factory.costParameterCtrl.RemoveCostParameter);
api.put('/costParameter/updateCost',factory.costParameterCtrl.UpdateCostParameter);

//rest for recharge
api.post('/cellPhone/newRecharge', factory.rechargeCtrl.PhoneRecharge);
api.get('/cellPhone/getPhoneInfo', factory.rechargeCtrl.ReturnRechargeInfo);

//rest for call
api.post('/cellPhone/call', factory.consumptionCtrl.ModifyMoneyInAccount);

module.exports = api;

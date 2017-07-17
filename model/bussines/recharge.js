'use strict'

const factory = require('../entities');
const resources = require('../../services-common');

function PhoneRecharge(obj) {
  return new Promise((resolve, reject) => {
    let rechargerObj = new factory.rechargeInfo();

    rechargerObj.numberCellphone = obj.numberCellphone;
    rechargerObj.userRechargeId = obj.userRechargeId;
    rechargerObj.moneyInAccount = obj.moneyInAccount;
    rechargerObj.costParameterId = obj.costParameterId;

    if (typeof obj !== 'object') {
      return reject({
        message: 'Error for save into DB',
      });
    }

    factory.rechargeInfo.find({
      numberCellphone: obj.numberCellphone
    }, (err, numberInfo) => {
      if (err) {
        return reject({
          message: 'Error for save into DB',
          devMessage: err
        });
      }
      if (numberInfo.length === 0) {
        rechargerObj.save((err, saveRecharge) => {
          if (err) {
            reject({
              message: 'Error for save into DB',
              devMessage: err
            })
          } else {
            resolve({
              message: 'Cellphone recharged',
              rechargerInfo: saveRecharge
            })
          }
        });
      } else {
        numberInfo[0].moneyInAccount += Number(obj.moneyInAccount);
        numberInfo[0].save((err, updateInfoRecharge) => {
          let history = new factory.historyRechargeInfo()
          history.numberCellphone = obj.numberCellphone;
          if (err) {
            reject({
              message: 'Error for save into DB',
              devMessage: err
            })
          } else {
            history.save((err, responseSaveHistory) => {
              if (err) {
                return reject({
                  message: 'Error for save into DB',
                  devMessage: err
                })
              }
              resolve({
                message: 'Cellphone recharged',
                rechargerInfo: updateInfoRecharge,
                history: responseSaveHistory
              })
            });
          }
        });

      }
    });
  });
}

function ReturnCellphoneInfo(numberCellphone, costParameterId) {
  return new Promise((resolve, reject) => {
    debugger;
    if (!Number.isInteger(Number(numberCellphone)))
      return 'number of cellphone require'

    factory.rechargeInfo.find({
        numberCellphone: numberCellphone
      })
      .populate('costParameterInfo', null, {
        _id: {
          $gte: costParameterId
        }
      })
      .exec(function(err, responseInfo) {
        if (responseInfo.length === 0) {
          return reject({
            message: 'Not find number',
            devMessage: err
          });
        }
        if (err) {
          reject({
            message: 'Error for save into DB',
            devMessage: err
          })
        } else {
          factory.costParameterInfo.find({
            _id: responseInfo[0].costParameterId
          }, (err, responseFindCots) => {
            if (err) {
              reject({
                message: 'Error for save into DB',
                devMessage: err
              })
            } else {
              responseInfo[0].costParameterObjs = responseFindCots;
              console.log(responseInfo);
              resolve({
                message: 'Cell information obtained',
                rechargeInfo: resources.commonResources.ReturnInfo({
                  moneyInAccount: responseInfo[0].moneyInAccount,
                  costForSecond: responseInfo[0].costParameterObjs[0].costForSecond
                })
              });
            }
          });

        }
      });
  });
}


module.exports = {
  PhoneRecharge,
  ReturnCellphoneInfo
};

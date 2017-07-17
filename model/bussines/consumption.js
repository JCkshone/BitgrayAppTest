'use strict'

const factory = require('../entities');
const resources = require('../../services-common');

function ModifyMoneyInAccount(numberCellphone, seconds) {
  return new Promise((resolve, reject) => {
    debugger;
    if (!Number.isInteger(Number(numberCellphone)))
      return 'number of cellphone require'
    debugger;
    factory.rechargeInfo.find({
      numberCellphone: numberCellphone
    }, (err, responseInfo) => {
      if (err) {
        return reject({
          message: 'Error for save into DB',
          devMessage: err
        });
      } else if (responseInfo.length === 0) {
        return reject({
          message: 'Error for save into DB',
          devMessage: err
        });
      }
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
          responseInfo[0].moneyInAccount -= resources.commonResources.RestarSeconds(seconds, responseFindCots[0].costForSecond);

          responseInfo[0].save((err, responseUpdateInfo) => {
            let history = new factory.historyConsumptionInfo()
            history.numberCellphone = numberCellphone;
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
                  message: 'Cell information update',
                  newInfo: responseUpdateInfo,
                  history: responseSaveHistory
                })

              });

            }

          });
        }
      });

    });
  });
}



module.exports = {
  ModifyMoneyInAccount
};

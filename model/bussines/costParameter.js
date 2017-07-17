'use strict'

const factory = require('../entities');

function CreateCostsParameter(obj) {
  return new Promise((resolve, reject) => {

    let costParameterObj = new factory.costParameterInfo()

    costParameterObj.country = obj.country;
    costParameterObj.operatorName = obj.operatorName;
    costParameterObj.costForSecond = obj.costForSecond;

    if (typeof obj !== 'object')
      return {};

    costParameterObj.save((err, saveResponse) => {
      if (err) {
        reject({
          message: 'Error for save into DB',
          devMessage: err
        })
      } else {
        resolve({
          message: 'Create new cost parameter',
          cost: saveResponse
        })
      }
    });

  });
}

function UpdateCostParameter(objUpdate) {
  return new Promise((resolve, reject) => {

      factory.costParameterInfo.findByIdAndUpdate(objUpdate.costParameterId, {
        $set: objUpdate
      }, (err, responseUpdate) => {
        if (err) {
          reject({
            message: 'Error for update resource',
            devMessage: err
          })
        } else {
          resolve({
            message: 'Resource update',
            objUpdate: responseUpdate
          })
        }
      });
    }

  );
}

function GetCostsParameter() {
  return new Promise((resolve, reject) => {

    factory.costParameterInfo.find({}, (err, responseGet) => {
      if (err) {
        reject({
          message: 'Error for resources into DB',
          devMessage: err
        })
      } else {
        resolve({
          message: 'Get resources from DB',
          costs: responseGet
        })
      }
    });

  });
}

function DeleteCostParameter(costParameterId) {
  return new Promise((resolve, reject) => {

    factory.costParameterInfo.remove({
      _id: costParameterId
    }, (err, responseDelete) => {
      if (err) {
        reject({
          message: 'Error for delete resources from DB',
          devMessage: err
        })
      } else {
        resolve({
          message: 'resource delete',
          response: responseDelete
        })
      }
    });

  });
}



module.exports = {
  CreateCostsParameter,
  UpdateCostParameter,
  GetCostsParameter,
  DeleteCostParameter
};

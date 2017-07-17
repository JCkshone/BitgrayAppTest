'use strict'
debugger;
const factory = require('../entities');
const sertivesAuthResources = require('../../services-common');

function usrCreate(req, res) {
  let userObj = new factory.userInfo();
  userObj.email = req.body.email
  userObj.password = req.body.password
  userObj.userName = req.body.userName

  factory.userInfo.find({
    email: userObj.email
  }, (err, userFindObj) => {
    if (err) {
      return res.status(500).send({
        message: `Error al guardar en la base de datos: ${err}`
      });
    }

    if (userFindObj.length > 0) {
      res.status(200).send({
        user: userFindObj,
        token: sertivesAuthResources.authResources.createToken(userFindObj)
      });
    } else {
      userObj.save((err, saveResponse) => {
        if (err) {
          if (err.code === 11000)
            return res.status(405).send({
              message: 'Ya existe un usuario con el correo electronico ingresado.'
            })
          else
            return res.status(500).send({
              message: `Error al guardar en la base de datos: ${err}`
            });
        }
        res.status(200).send({
          user: saveResponse,
          token: sertivesAuthResources.authResources.createToken(saveResponse)
        });
      });
    }
  });


}

module.exports = {
  usrCreate
};

'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const userSchema = new schema({
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  userName: String,
  password: {
    type: String,
    select: false
  }
});
userSchema.pre('save', (next) => {
  let user = this
  //if (!user.isModified('password')) return next()

  bcrypt.genSalt(10, (err, salt) => {
    if (err)
      return next(err)

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err)
        return next(err)

      user.password = hash
      next()
    })
  })
});


module.exports = mongoose.model('userInfo', userSchema);

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const SubUserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  fname: {
    type: String,
    required: true
  },
  lname: {
    type: String,
    required: true
  },
  telephone: {
    type: String,
    required: true
  },
  superuserid: {
    type: String,
    required: true
  },
}, 
{
  timestamps: true
});

const SubUser = module.exports = mongoose.model('SubUser', SubUserSchema);

module.exports.addSub = function(newSub, callback) {
  var SuperUser = require('./SuperUser.js');
  SuperUser.findById(newSub.superuserid, (err, superuser) => {
    if (err) {
      callback(err);
    } else {
      if (superuser.id != newSub.superuserid) {
        let err = new Error('SuperUser ID not found.');
        err.status = 401;
        return callback(err);
      } else {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newSub.password, salt, (err, hash) => {
              if (err) {
                return callback(err);
              } else {
                newSub.password = hash;
                newSub.save((err, SavedSub) => {
                  if (err) {
                    return callback(err);
                  } else {
                    SuperUser.addSubtoSuper(superuser, SavedSub._id);
                    callback(err, SavedSub);
                  }
                });
              }
            });
        });
      }
    }
  });
  // Check to see if SuperUser exists before hashing password
}
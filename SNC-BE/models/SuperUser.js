const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const SubUser = require('./SubUser.js');

var SuperUserSchema = new mongoose.Schema({
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
  address: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  telephone: {
    type: String,
    required: true
  },
  subusers: {
    type: [SubUser.Schema]
  }
}, 
{
  timestamps: true
});

const SuperUser = module.exports = mongoose.model('SuperUser', SuperUserSchema);

module.exports.addSubtoSuper = function(sup, subtoAdd, callback) {
  if (sup.subusers == null) {
    sup.subusers = [subtoAdd];
  } else {
  sup.subusers.push(subtoAdd);
  sup.save(callback);
  }
}

module.exports.addSuper = function(newSuper, callback) {
  bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newSuper.password, salt, (err, hash) => {
          if (err) {
            return callback(err);
          } else {
            newSuper.password = hash;
            newSuper.save(callback);
          }
      });
  });
}


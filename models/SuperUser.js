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
  subusers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubUser'
  }]
},
{
  timestamps: true
});

SuperUserSchema.pre('save', function (next) {
  var superuser = this;
  bcrypt.hash(superuser.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }

      superuser.password = hash;
      next();
  })
});

SuperUserSchema.statics.authenticate = function (email, password, callback) {
  SuperUser.findOne({ email: email })
    .exec(function (err, superuser) {
      if (err) {
        return callback(err)
      } else if (!superuser) {
        var err = new Error('SuperUser not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, superuser.password, function (err, result) {
        if (result === true) {
          return callback(null, superuser);
        } else {
          return callback();
        }
      })
    });
}

const SuperUser = module.exports = mongoose.model('SuperUser', SuperUserSchema);

module.exports.addSubtoSuper = function(sup, subID, callback) {
  if (sup.subusers == null) {
    sup.subusers = [subID];
  } else {
  sup.subusers.push(subID);
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

/**
 * @module
 * @requires {@link https://www.npmjs.com/package/mongoose}
 * @requires {@link https://www.npmjs.com/package/bcryptjs}
 */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * Mongoose model for all users. Innapropriately named SuperUser
 * @class SuperUser
 * @param {string} email
 * @param {string} password - Gets hashed on save
 * @param {string} fname - User's first name
 * @param {string} lname - User's last name
 * @param {string} address
 * @param {string} company
 * @param {string} telephone
 * @param {boolean} issuper - True: SuperUser, False: SubUser
 * @param {ObjectId} superuser - ObjectID referencing a SuperUser {@link models/SuperUser~SuperUser}
 * @param {array} subusers - Array of ObjectIDs referencing SubUsers {@link models/SuperUser~SuperUser}
 * @param {array} saqtemplates - Array of string IDs referencing {@link module:models/SAQTemplate~SAQTemplate}
 * @param {JSON} businessinfo - JSON consisting of information needed to fill out part 1 of SAQs
 */
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
  issuper: {
    type: Boolean,
    required: true
  },
  superuser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'superuser'
  },
  subusers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'superuser'
  }],
  saqtemplates: [{
    type: String,
    ref: 'SAQTemplate'
  }],
  businessinfo: {
    type: Object
  }
}, {
  timestamps: true
});

SuperUserSchema.pre('save', function(next) {
  var superuser = this;
  bcrypt.hash(superuser.password, 10, function(err, hash) {
    if (err) {
      return next(err);
    }
    superuser.password = hash;
    next();
  })
});

SuperUserSchema.post('save', (sub, next) => {
  console.log(sub);
  if (!sub.issuper) {
    SuperUser.findOneAndUpdate({
      _id: sub.superuser
    }, {
      $push: {
        subusers: sub._id
      }
    }).exec((err, super1) => {
      if (err) {
        next(err)
      } else {
        next();
      }
    });
  } else {
    next();
  }
})

SuperUserSchema.statics.authenticate = function(email, password, callback) {
  SuperUser.findOne({
      email: email
    })
    .exec(function(err, superuser) {
      if (err) {
        return callback(err)
      } else if (!superuser) {
        var err = new Error('SuperUser not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, superuser.password, function(err, result) {
        if (result === true) {
          return callback(null, superuser);
        } else {
          return callback();
        }
      })
    });
}

const SuperUser = module.exports = mongoose.model('SuperUser', SuperUserSchema);

/**
 * @callback module:models/SuperUser~SAQAssignmentsCallback
 * @param {error} err
 * @param {array} user.saqtemplates - Array of SAQTemplate IDs that the user has accees to
 */

/**
 * Function to get a users SAQ assignment. Returns true if SuperUser, else returns array of all templates user has access to.
 * @param {string} id - User ID
 * @param {module:models/SuperUser~SAQAssignmentsCallback} callback
 */
module.exports.SAQAssignments = (id, callback) => {
  SuperUser.findById(id).exec((err, user) => {
    if (err) {
      callback(err);
    } else {
      console.log(user);
      if (user.issuper) {
        callback(err, true);
      } else {
        callback(err, user.saqtemplates);
      }
    }
  });
}

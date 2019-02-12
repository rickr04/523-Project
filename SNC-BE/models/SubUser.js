var mongoose = require('mongoose');
var bcryptjs = require('bcryptjs');

var SubUserSchema = new mongoose.Schema({
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
    type: Number,
    required: true
  },
}, 
{
  timestamps: true
});

var SubUser = mongoose.model('SubUser', SubUserSchema);
module.exports = SubUser;
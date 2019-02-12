var mongoose = require('mongoose');
var bcryptjs = require('bcryptjs');

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
  subuserids: {
    type: [Number]
  },
  
}, 
{
  timestamps: true
});

var SuperUser = mongoose.model('SuperUser', SuperUserSchema);
module.exports = SuperUser;
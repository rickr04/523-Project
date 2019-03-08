var mongoose = require('mongoose');

var AccountSAQSchema = new mongoose.Schema({
  superuserid: {
    type: String,
    required: true,
    ref: 'SuperUser'
  },
  name: {
    type: String,
    unique: true,
    required: true,
  },
  questionsandanswers: {
      type: Object,
      required: true
  },
  templateid : {
      type: Number,
      required: true
  }
},
{
  timestamps: true
});

var AccountSAQ = mongoose.model('AccountSAQ', AccountSAQSchema);
module.exports = AccountSAQ;

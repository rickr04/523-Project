var mongoose = require('mongoose');

var AccountSAQSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  questionsandanswers: {
      type: [String],
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
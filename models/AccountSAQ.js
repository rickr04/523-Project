var mongoose = require('mongoose');

var AccountSAQSchema = new mongoose.Schema({
  superuserid: {
    type: mongoose.Schema.Types.ObjectId,
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
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'SAQTemplate'
  }
},
{
  timestamps: true
});

var AccountSAQ = mongoose.model('AccountSAQ', AccountSAQSchema);
module.exports = AccountSAQ;

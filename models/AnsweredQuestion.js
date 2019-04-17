const mongoose = require('mongoose');

const AnsweredQuestionSchema = new mongoose.Schema({
  question: {
    type:  String,
    required: true,
    ref: 'Question'
  },
  answer: {
    type: String
  },
  superuserid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'SuperUser'
  },
  ccw: [{
    header: {type: String},
    response: {type: String}
  }]

});

const AnsweredQuestion = mongoose.model('AnsweredQuestion', AnsweredQuestionSchema);
module.exports = AnsweredQuestion;

module.exports.getCCW = (userid, callback) => {
  AnsweredQuestion.find({superuserid: mongoose.Types.ObjectId(userid), answer: "Yes with CCW"}).populate('question').exec((err, questions) => {
    if (err) {
      return callback(err);
    } else {
      callback(err, questions);
    }
  });
}
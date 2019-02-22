const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  questiontext: {
    type: String,
    required: true,
  },
  answertype: {
      type: Number,
      required: true
  }
}, 
{
  timestamps: true
});

const Question = mongoose.model('Question', QuestionSchema);
module.exports = Question;

// Function in order to get multiple questions for SAQTemplate
// Takes in array of IDs and returns array of Questions
module.exports.getQuestionsByIDs = function(ids) {
  let questions = [];
  for (let i = 0; i < ids.length; i++) {
    questions[i] = Question.findById(ids[i], (err, question) => {
      if (err) {
        throw err;
      } else {
        return question;
      }
    });
  }
}
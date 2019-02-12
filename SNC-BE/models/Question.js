var mongoose = require('mongoose');

var QuestionSchema = new mongoose.Schema({
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

var Question = mongoose.model('Question', QuestionSchema);
module.exports = Question;
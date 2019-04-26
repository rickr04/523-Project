/**
 * @module
 */
const mongoose = require('mongoose');

/**
 * Mongoose model for SAQ questions.
 * @class Question
 * @param {string} questiontext
 * @param {number} answertype - 0: No answer, 1: Multiple choice, 2: Free response
 * @param {array} answers - Array of strings that contain answer choices for multiple choice questions
 * @param {string} _id - Custom set ID of string to help with managing questions in the DB
 */
const QuestionSchema = new mongoose.Schema({
  questiontext: {
    type: String,
    required: true,
  },
  answertype: {
    type: Number,
    required: true
  },
  answers: [{
    type: String,
  }],
  _id: {
    type: String,
  }
}, {
  timestamps: true
});

const Question = mongoose.model('Question', QuestionSchema);
module.exports = Question;

/**
 * @callback module:models/Question~getQuestionsByIDsCallback
 * @param {error} err
 * @param {array} questions - Array of {@link modules:model/Question~Question}
 */
/**
 * Function in order to get multiple questions
 * @param {array} ids - Array of strings containing questionIDs
 * @param {module:models/Question~getQuestionsByIDsCallback} callback
 */
module.exports.getQuestionsByIDs = (ids, callback) => {
  let questions = [];
  for (let i = 0; i < ids.length; i++) {
    questions[i] = Question.findById(ids[i], (err) => {
      if (err) throw err;
    });
  }
  callback(null, questions);
}

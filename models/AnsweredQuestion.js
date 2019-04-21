/**
 * @module
 */
const mongoose = require('mongoose');
const Users = require('./SuperUser')

/**
 * Mongoose model for answered questions.
 * @class AnsweredQuestion
 * @param {string} question - String ID referencing {@link module:models/Question~Question}
 * @param {string} answer - The provided answer
 * @param {ObjectID} templateid - ObjectID refencing {@link module:models/SAQTemplate~SAQTemplate}
 * @param {array} ccw - Array of objects used to fill out CCW info
 */
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

/**
 * @callback getCCWCallback
 * @param {error} err
 * @param {array} questions - Array of {@link module:models/Question~Question}
 */

/**
 * Get all the questions that a user has answered with CCW
 * @param {string} userid
 * @param {getCCWCallback} callback
 */
module.exports.getCCW = (userid, callback) => {
  // Get user to see if they are super
  Users.findById(userID).exec((err, user) => {
    if (err) {
      return callback(err);
    } else {
      // If they aren't a Super, we set the userID to that of the associated SuperUser
      if (!user.issuper) userID = user.superuser;
      
      // Query based on userid and answer
      AnsweredQuestion.find({superuserid: mongoose.Types.ObjectId(userid), answer: "Yes with CCW"}).populate('question').exec((err, questions) => {
        if (err) {
          return callback(err);
        } else {
          callback(err, questions);
        }
      });
    }
  });
}
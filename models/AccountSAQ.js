var mongoose = require('mongoose');
const SAQTemplate = require('./SAQTemplate.js');
const AnsweredQuestion = require('./AnsweredQuestion.js');

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
  templateid : {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'SAQTemplate'
  },
  answeredquestions : [{
    type: mongoose.Schema.Types.ObjectId, 
    required: true,
    ref: 'AnsweredQuestion',
  }]
},
{
  timestamps: true
});

var AccountSAQ = mongoose.model('AccountSAQ', AccountSAQSchema);
module.exports = AccountSAQ;

module.exports.getAccountSAQJSON = (AccountSAQId, callback) => {
  let JSONvar = {};
  AccountSAQ.findById(AccountSAQId).populate({
    path: 'answeredquestions',
    populate: {path: 'question'}
  }).exec((err, populatedSAQ) => {
    if (err) {
      callback(err)
    } else {
      populatedSAQ.answeredquestions.forEach((item, index, array) => {
        if (err) {
          callback(err);
        } else {
          JSONvar[item.question._id] = item.answer;
          if (index + 1 == array.length) callback(err, JSONvar);
          }
      });
    }
  });
  
}

module.exports.buildAccountSAQ = (templateID, userID, name, callback) => {
  let questionIDs = [];
  SAQTemplate.findById(templateID).populate('questions').exec((err, question) => {
    if (err) {
      callback(err);
    } else {
      question.questions.forEach((item, index, array) => {
        let newAnswered = new AnsweredQuestion({
          question: item._id,
          answer: ' ',
          superuserid: userID
        });
        newAnswered.save((err, savedAnswer) => {
          if (err) {
            callback(err)
          } else {
            questionIDs.push(savedAnswer._id);
            if (questionIDs.length == array.length) {
              let newAccountSAQ = new AccountSAQ({
                superuserid: userID,
                name: name,
                templateid: templateID,
                answeredquestions: questionIDs
              });
              newAccountSAQ.save(callback(err, newAccountSAQ));
            }
          }
        });
      });
    }
  });
}

module.exports.updateSAQAnswers = (tempID, userID, answers, callback) => {
  AccountSAQ.findOne({superuserid: userID, templateid: tempID}).populate('answeredquestions').exec((err, ansq) => {
    if (err) {
      callback(err);
    } else {
      if (ansq == null) { 
        buildAccountSAQ(tempID, userID, tempID + userID, callback);
      } else {
        ansq.answeredquestions.forEach((item, index, array) => {
          item.answer = answers[item.question];
          item.save((err) => {
            if (index + 1 == array.length) callback(err);
          });
        });
      }
    }
  });
}
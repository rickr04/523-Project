var mongoose = require('mongoose');
const SAQTemplate = require('./SAQTemplate');
const AnsweredQuestion = require('./AnsweredQuestion');
const Users = require('./SuperUser');

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
    type: String,
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

/**
 * Gets JSON of account SAQ answers and CCW to build PDFs and excel sheets.
 * @param {string} AccountSAQId - The ID of the Account SAQ
 * @param {getAccountSAQJSONCallback} callback
 */
module.exports.getAccountSAQJSON = (AccountSAQId, callback) => {
  // First we get the account SAQ and populate its fields
  AccountSAQ.findById(AccountSAQId).populate({
    path: 'answeredquestions',
    populate: {path: 'question'}
  }).populate('superuserid').exec((err, populatedSAQ) => {
    if (err) {
      callback(err)
    } else {
      // Check to make sure answers are valid for PDF filling
      var setCheck = new Set();
      setCheck.add("Yes").add("No").add("N/A").add("Yes with CCW");
      let superuser = populatedSAQ.superuserid;
      let JSONforFill = [];
      // If businessinfo exists, the we add it to the JSON for filling
      if (typeof superuser.businessinfo === 'object') JSONforFill = superuser.businessinfo;
      let CCW = [];
      // Add company info to JSON
      JSONforFill["Company Name"] = superuser.company;
      JSONforFill["Contact Name"] = superuser.fname + '' + superuser.lname;
      JSONforFill["Telephone"] = superuser.telephone;

      // Iterate through all the answers to format the JSON correctly
      populatedSAQ.answeredquestions.forEach((item, index, array) => {
        if (err) {
          callback(err);
        } else {
          // If answer type is multiple choice [id+answer] = "X"
          if (item.question.answertype == 1 && item.answer != '' && setCheck.has(item.answer)) {
            JSONforFill[item.question._id+item.answer]="X";
            if (item.answer == "Yes with CCW") CCW.push(item.ccw);
            // If it's fill in the blank [_id]=answer
          } else if (item.question.answertype == 2) {
            JSONforFill[item.question._id] = item.answer;
          }
          /**
           * Callback passing the JSONforFill and the array of CCW obejcts
           * @callback getAccountSAQJSONCallback
           * @param {error} err
           * @param {JSON} JSONforFill - JSON needed for PDF filling
           * @param {array} CCW - Array of CCW JSONs
           */
          if (index + 1 == array.length) callback(err, JSONforFill, CCW);
        }
      });
    }
  });
}

/**
 * Helper function that builds a new AccountSAQ and its relevant AnsweredQuestions.
 * @param {string} templateID - The SAQ template ID
 * @param {string} userID - The SuperUser ID
 * @param {string} name - What you want to name the new AccountSAQ
 * @param {buildAccountSAQCallback} callback
 */
let buildAccountSAQ = (templateID, userID, name, callback) => {  
  let questionIDs = [];
  // Get and populate the relevant SAQTemplate
  SAQTemplate.findById(templateID).populate('questions').exec((err, question) => {
    if (err) {
      callback(err);
    } else {
      // Iterate through each question
      question.questions.forEach((item, index, array) => {
        // First check if AnsweredQuestion for that question exists for that userID
        AnsweredQuestion.findOne({question: item._id, superuserid: userID}).exec((err, tempAns) => {
          if (err) {
            callback(err);
          } else {
            // If AnswereQuestion exists, push it to the array
            if (tempAns != null) {
              questionIDs.push(tempAns._id);
              // If loop is done then create and save the AccountSAQ
              if (questionIDs.length == array.length) {
                // Need to put this in a function most likely
                let newAccountSAQ = new AccountSAQ({
                  superuserid: userID,
                  name: name,
                  templateid: templateID,
                  answeredquestions: questionIDs
                });
                newAccountSAQ.save((err, newAccountSAQ) => {
                  if (err) {
                    callback(err)
                  } else {
                    callback(err, newAccountSAQ);
                  }
                });
              }
            // If AnsweredQuestion does not exist, then create one for that userID, save it, and push it's ID to the array
            } else {
              let newAnswered = new AnsweredQuestion({
                question: item._id,
                superuserid: userID
              });
              newAnswered.save((err, savedAnswer) => {
                if (err) {
                  callback(err);
                } else {
                  questionIDs.push(savedAnswer._id);
                  // If loop is done then create and save AccountSAQ
                  if (questionIDs.length == array.length) {
                    let newAccountSAQ = new AccountSAQ({
                      superuserid: userID,
                      name: name,
                      templateid: templateID,
                      answeredquestions: questionIDs
                    });
                    newAccountSAQ.save((err, newAccountSAQ) => {
                      if (err) {
                        callback(err)
                      } else {
                        /**
                        * Callback passing the new AccountSAQ
                        * @callback buildAccountSAQCallback
                        * @param {error} err 
                        * @param {AccountSAQ} newAccountSAQ - Newly created AccountSAQ object
                        */
                        callback(err, newAccountSAQ);
                      }
                    });
                  }
                }
              });
            }
          }
        });
      });
    }
  });
}

module.exports.getAccountSAQ =  (tempID, userID, callback) => {
  Users.findById(userID).exec((err, user) => {
    if (err) {
      callback(err);
    } else {
      if (!user.issuper) userID = user.superuser;
      AccountSAQ.findOne({superuserid: userID, templateid: tempID}).exec((err, saq) => {
        if (err) {
          callback(err);
        } else {
          if (saq) {
            callback(err, saq);
          } else {
            buildAccountSAQ(tempID, userID, tempID + userID, (err, saq) => {
              if (err) {
                callback(err);
              } else {
                callback(err, saq);
              }
            });
          }
        }
      });
    }  
  });
}

let updateSAQAnswers = (ansq, answers, callback) => {
  ansq.answeredquestions.forEach((item, index, array) => {
    if (typeof answers[item.question] === 'undefined') {
      if (index + 1 == array.length) callback(null, AccountSAQ.findById(ansq._id));
    } else {
      item.answer = answers[item.question];
      item.save((err) => {
        if (err) {
          callback(err);
        } else if (index + 1 == array.length) {
          callback(null, ansq._id);
        }
      });
    }
  });
}

module.exports.createAndUpdateSAQ = (tempID, userID, answers, callback) => {
  Users.findById(userID).exec((err, user) => {
    if (err) {
      callback(err);
    } else {
      if (!user.issuper) userID = user.superuser;
      AccountSAQ.findOne({superuserid: userID, templateid: tempID}).populate('answeredquestions').exec((err, ansq) => {
        if (err) {
          callback(err);
        } else {
          if (ansq) {
            updateSAQAnswers(ansq, answers, callback);
          } else {
            buildAccountSAQ(tempID, userID, tempID + userID, (err, ansq) => {
              if (err) {
                callback(err);
              } else {
                updateSAQAnswers(ansq, answers, callback);
              }
            });
          }
        }
      });
    }
  });
}
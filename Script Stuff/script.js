// To run this script simply run the following command from the home directory: node "Script Stuff/script.js"
const SAQTemplate = require('../models/SAQTemplate.js');
const Question = require('../models/Question.js');
const SuperUser = require('../models/SuperUser');
const mongoose = require('mongoose');
const questions = require('./allQuestions.js');
const allSAQs = require('./allSAQs.js');
const dotenv = require('dotenv');
dotenv.config();

var db = mongoose.connection;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/snc');
//mongoose.connect(  'mongodb://localhost:27017/snc');

// Alert of succesful connection/error

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("Connected to DB");
});

let user = new SuperUser({
  "email": "admin",
  "issuper": true,
  "password": "password",
  "fname": "first",
  "lname": "last",
  "address": "street",
  "company": "company",
  "telephone": "555-555-5555",
  "businessinfo": {
    "city": "city",
    "state": "state",
    "country": "US of A",
    "zipcode": "12345",
    "url": "www.website.com",
    "dba": "a business"
  }
});

user.save(function(err) {
  if (err) {
    return console.error(err);
  }
  console.log("added admin to database");
});

//put questions in database
questions.forEach((question, index, array) => {
  let tempQuest = new Question(question);
  tempQuest.save((err, quest) => {
    if (err) {
      console.log(err)
    } else if (index + 1 == array.length) {
      allSAQs.forEach((saq, index, array) => {
        let tempSAQ = new SAQTemplate(saq);
        tempSAQ.save((err) => {
          if (err) {
            console.log(err)
          } else if (index + 1 == array.length) {
            mongoose.connection.close();
          }
        });
      });
    }
  });
});

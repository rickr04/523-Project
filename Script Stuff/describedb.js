// To run this script simply run the following command from the home directory: node "Script Stuff/describedb.js"
//displays information about contents of database in the console
const SAQTemplate = require('../models/SAQTemplate.js');
const Question = require('../models/Question.js');
const SuperUser = require('../models/SuperUser');
const mongoose = require('mongoose');

var db = mongoose.connection;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/snc');
//mongoose.connect(  'mongodb://localhost:27017/snc');

// Alert of succesful connection/error

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("Connected to DB");
});

// show what is in the database in console
SuperUser.find(function(err, stuff) {
  if (err) {
    console.log("error finding SuperUsers");
  } else {
    console.log("# of superusers: " + stuff.length);
    //console.log(stuff);
  }
});
SAQTemplate.find(function(err, stuff) {
  if (err) {
    console.log("error finding SAQTemplates");
  } else {
    console.log("# of saqs: " + stuff.length);
    //console.log(stuff);
  }
});
Question.find(function(err, stuff) {
  if (err) {
    console.log("error finding Questions");
  } else {
    console.log("# of questions: " + stuff.length);
    //console.log(stuff);
  }
});

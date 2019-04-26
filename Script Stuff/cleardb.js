// To run this script simply run the following command from the home directory: node "Script Stuff/cleardb.js"
//clears super users, saq tempates and questions from database
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

SuperUser.remove({}, function(err) {
  console.log('SuperUsers removed from db')
});
SAQTemplate.remove({}, function(err) {
  console.log('SAQTemplates removed from db')
});
Question.remove({}, function(err) {
  console.log('Questions removed from db')
});

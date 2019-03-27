const express = require('express');
const router = express.Router();
const cors = require('cors');
const app = express();
const Admin = require('../models/Admin');
const SuperUser = require('../models/SuperUser');
const AccountSAQ = require('../models/AccountSAQ');

const SubUser = require('../models/SubUser');
const Question = require('../models/Question');
const SAQTemplate = require('../models/SAQTemplate');
const Skeleton = require('../models/skeleton');
const s3Handling = require('../services/file-upload');
const mongoose = require('mongoose');


var corsOptions = {
  credentials: true,
  origin: 'http://localhost:4200'
};

router.options('*', cors())
router.use(cors());


//Superuser registration
router.post('/api/register', (req, res, next) => {

  var superUserData = {
    email: req.body.email,
    fname: req.body.fname,
    lname: req.body.lname,
    password: req.body.password,
    address: req.body.address,
    company: req.body.company,
    telephone: req.body.telephone
  }

  SuperUser.create(superUserData, function(error, superuser) {
    if (error) {
      return next(error);
    } else {
      req.session.superuserId = superuser._id;
      return res.status(error ? 500 : 200).send(error ? error : {
        message: "Super User has been registered",
        data: superuser
    });
  }
  });
});

//Superuser login
router.post('/api/login', (req, res, next) => {
var superuserdata = {
  email: req.body.email,
  password: req.body.password
}

SuperUser.authenticate(superuserdata.email, superuserdata.password, function(error, superuser) {
  if (error || !superuser) {
    var err = new Error('Wrong username or password.');
    err.status = 401;
    return next(error);
  } else {
    req.session.superuserId = superuser._id;
    return res.status(err ? 500 : 200).send(err ? err :
      {
      message: "Super User has been logged in",
      data: superuser
    });
  }
});
});


//check if authenticated
router.get('/api/superuser/auth', function(req, res, next){
  var auth = "false"
  var err = new Error('Not Authorized');
  if(req.session.superuserId){
    err.status = 200;
    auth = "true";
  }else{
    err.status = 401;
    auth = "false";
  }

  return res.json({status: err.status, data: [auth]});

});


/* Create Subuser. SuperUser ID stored in params._id.
JSON format passed needs to be as follows:
{
	"email":"testa@test.com",
	"password":"1234",
	"fname":"Test",
	"lname":"TESTAGAIN",
	"telephone":"012-345-6789"
}
*/
router.post('/api/:_id/create', (req, res, next) => {
  if (req.session && req.params._id == req.session.superuserId) {
    let subUserData = new SubUser({
      email: req.body.email,
      password: req.body.password,
      fname: req.body.fname,
      lname: req.body.lname,
      telephone: req.body.telephone,
      superuserid: req.params._id
    });
    SubUser.addSub(subUserData, (err, savedSub) => {
      if (err) {
        res.json({success: false, message: err.message});
      } else {
        res.json({success: true, message: "Subuser created", data: savedSub});
      }
    });
  } else {
    var err = new Error('Not Authorized');
    err.status = 400;
    return next(err);
  }
});

/* Post DB questions
JSON format as follows, I choose to manually assign IDs so that we can
better track our form fields and their corresponding IDs.
{
  "questiontext":"What is the date?",
  "answertype":"0",
  "id":"123abc"
} */
router.post('/api/admin/question', (req, res, next) => {
  let newQuestion = new Question({
    questiontext: req.body.questiontext,
    answertype: req.body.answertype,
    _id: req.body.id
  });

  newQuestion.save((err) => {
    if (err) {
      res.json({success: false, message: err.message});
    } else {
      res.json({success: true, message:'Question Posted'});
    }
  });
});

/* Posts SAQ Template. Name is the SAQ type, questions are question IDs
{
	"name":"a",
	"questions":["a2","a1"]
} */
router.post('/api/admin/SAQTemplate', (req, res, next) => {
  let newSAQTemplate = new SAQTemplate({
    name: req.body.name,
    questions: req.body.questions
  });
  console.log(req.body.questions);
  newSAQTemplate.save((err) => {
    if (err) {
      res.json({success: false, message: err.message});
    } else {
      res.json({success: true, message:'SAQ Template Posted'});
    }
  });
});

// Get questions from SAQTemplate. Just need to pass it the ID of the SAQTemplate.
router.get('/api/SAQ', (req, res, next) => {
  SAQTemplate.findById(req.body.id).populate('questions').exec((err, question) => {
    if (err) {
      res.json({success: false, message: err.message});
    } else {
      res.send(question.questions);
    }
  });
});


module.exports = router;

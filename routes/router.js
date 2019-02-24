const express = require('express');
const router = express.Router();
const cors = require('cors');
const app = express();
const Admin = require('../models/Admin');
const SuperUser = require('../models/SuperUser');
const SubUser = require('../models/SubUser');
const Question = require('../models/Question');
const Questions = require('../models/SAQTemplate');

var corsOptions = {
  credentials: true,
  origin: 'http://localhost:4200'
};
router.options('*', cors())
router.use(cors());

router.post('/api/login', function(req, res, next) {
  // confirm that user typed same password twice

  if (
    req.body.usernameRegister &&
    req.body.passwordRegister &&
    req.body.passwordConf) {

    var adminData = {
      username: req.body.usernameRegister,
      password: req.body.passwordRegister,
      passwordConf: req.body.passwordConf,
    }

    Admin.create(adminData, function(error, admin) {
      if (error) {
        return next(error);
      } else {
        req.session.adminId = admin._id;
        return res.status(err ? 500 : 200).send(err ? err : {
          message: admin.username+" has been registerd",
          data: admin.username
      });
    }
    });

  } else if (req.body.username && req.body.password) {
    Admin.authenticate(req.body.username, req.body.password, function(error, admin) {
      if (error || !admin) {
        var err = new Error('Wrong username or password.');
        err.status = 401;
        return next(err);
      } else {
        req.session.adminId = admin._id;
        return res.status(err ? 500 : 200).send(err ? err :
          {
          data: {username: admin.username, _id: admin._id}
        });
      }
    });
  } else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
});



// GET for logout logout
router.get('/admin/logout', cors(corsOptions), function(req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if (err) {
        return next(err);
      } else {
        return res.status(err ? 500 : 200).send(err ? err : req.session.adminId);
      }
    });
  }
});

// Create SuperUser
router.post('/api/SuperUser', (req, res, next) => {
  if (req.body.password != req.body.passwordConf) {
    res.json({success: false, msg:'Passwords did not match'});
  } else {
    let newSuper = new SuperUser({
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address,
      company: req.body.company,
      telephone: req.body.telephone,
    });

    SuperUser.addSuper(newSuper, (err, newSuper) => {
      if (err) {
      res.json({success: false, msg:'Failed to register user.' + err.message});
      } else {
      res.json({success: true, msg:'User Registered'});
      }
    });
  }
});

// Create SubUser
router.post('/api/SubUser', (req, res, next) => {
  if (req.body.password != req.body.passwordConf) {
    res.json({success: false, msg:'Passwords did not match'});
  } else {
      let newSub = new SubUser({
          fname: req.body.fname,
          lname: req.body.lname,
          email: req.body.email,
          password: req.body.password,
          telephone: req.body.telephone,
          superuserid: req.body.superuserid
      });
      SubUser.addSub(newSub, (err, newSub) => {
          if (err) {
              res.json({success: false, msg: err.message});
          } else {
              res.json({success: true, msg:'User Registered'});
          }
      });
  }
});

// Create Question
router.post('/api/Question', (req, res, next) => {
  let newQuestion = new Question({
    questiontext: req.body.questiontext,
    answertype: req.body.answertype
  });

  newQuestion.save((err) => {
    if (err) {
      res.json({success: false, msg: err.message});
    } else {
      res.json({success: true, msg:'Question Posted'});
    }
  });
});

// Create SAQTemplate, currently uses QuestionIDs and template name
router.post('/api/SAQ', (req, res, next) => {
  let SAQquestions = Questions.getQuestionsByIds(req.body.questions);

  let SAQ = new SAQTemplate({
    name: req.body.name,
    questions: SAQquestions
  });

  SAQ.save((err) => {
    if (err) {
      res.json({success: false, msg: err.message});
    } else {
      res.json({success: true, msg:'SAQ Template Created'});
    }
  });
});

module.exports = router;

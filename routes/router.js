const express = require('express');
const router = express.Router();
const cors = require('cors');
const app = express();
const Admin = require('../models/Admin');
const SuperUser = require('../models/SuperUser');
const SubUser = require('../models/SubUser');
const Question = require('../models/Question');
const Questions = require('../models/SAQTemplate');
const Skeleton = require('../models/Skeleton');
const s3Handling = require('../services/file-upload');
const singleUpload = s3Handling.upload.single('pdf');

var corsOptions = {
  credentials: true,
  origin: 'http://localhost:4200'
};

router.options('*', cors())
router.use(cors());


// Really basic ability to upload file to s3.
router.post('/api/demo/s3', (req, res, next) => {
  singleUpload(req, res, (err) => {
    return res.json({'pdfUrl': req.file.location});
  })
});

router.post('/api/demo/answerquestion', (req, res, next) => {
  s3Handling.download({Bucket: S3_BUCKET, Key:"1551067527016.pdf"}, req.body, (err) => {
    if (err) {
      res.json({success: false, msg: err.message});
    } else {
      res.json({success: true, msg:'Updated filled form'});
  }
  });
});

router.post('/api/demo/:_id', function(req, res, next){
  Skeleton.findById(req.params._id)
    .exec(function(error, lasercutter) {
      if (error) {
        return next(error);
      } else {
         var temp_id = req.params._id;
        Skeleton.findByIdAndUpdate(temp_id, {Answer: req.body.answer}, function(err, newbool) {
         if (err) {
           res.json({
             message: 'Error!'
           });
         } else {
           res.json({
             Answer: req.body.answer
           });
         }
       });
     }
   });
});


router.get('/api/demo', function(req, res, next) {

  Skeleton.find({}, {}, function(err, skeleton) {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    }
    res.json({
      status: "success",
      data: skeleton
    });
  });

});

router.post('/api/demo', function(req, res, next) {
  var skeleton = new Skeleton();
  skeleton.Question = req.body.question;
  skeleton.Answer = "u";

  // save the contact and check for errors
  skeleton.save(function(err) {
    if (err) {
      res.json(err);
    } else {
      res.json({
        message: "New Question Added",
        data: skeleton
      });
    }
  });

});

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
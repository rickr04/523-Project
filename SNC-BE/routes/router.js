var express = require('express');
var router = express.Router();
var Admin = require('../models/Admin');
var cors = require('cors');
var app = express();

var corsOptions = {
  credentials: true,
  origin: 'http://localhost:4200'
};
router.options('*', cors())
router.use(cors());








router.post('/login', function(req, res, next) {
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
})



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



module.exports = router;

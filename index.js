var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
const cookieParser = require('cookie-parser');
var MongoStore = require('connect-mongo')(session);
var cors = require('cors');
const dotenv = require('dotenv');
dotenv.config()
// Connect to MongoDB

var db = mongoose.connection;
mongoose.connect(  process.env.MONGODB_URI || 'mongodb://localhost:27017/testboi');
//mongoose.connect(  'mongodb://localhost:27017/snc');

// Alert of succesful connection/error

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
});

app.use(express.static(__dirname + '/SNC-FE/dist/SNC'));

// Use sessions for tracking logins
app.use(session({
  secret: 'sEcUrE&&C0MP1i@NT',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

// Parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({credentials: true, origin: 'http://localhost:4200'}));

// serve static files from template
//app.use(express.static(__dirname + '/template'));

// Include routes
var routes = require('./routes/router');
app.use('/', routes);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// Error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});


// Listen on port 3000
port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log('Express app listening on port 3000');
});

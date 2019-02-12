var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

// Connect to MongoDB
var database = 'mongodb://localhost/SNC';
mongoose.connect(database, {useNewUrlParser: true});

// Alert of succesful connection/error
var db = mongoose.connection;
mongoose.connection.on('connected', () => {
  console.log('Connected to database '+ database);
});
mongoose.connection.on('error', (err) => {
  console.log('Database Error: '+ err);
});

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
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function () {
  console.log('Express app listening on port 3000');
});

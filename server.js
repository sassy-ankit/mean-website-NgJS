var express = require('express');
var app = express();
var router = express.Router();
var logger = require('morgan');
var cors = require('cors');
var path = require('path');
var bodyParser = require('body-parser');
var passport = require('passport');
var social = require('./app/passport/passport')(app, passport);
var mongoose = require('mongoose');

// Routes
var appRoutes = require('./app/routes/api')(router);

// DB connection
var dbURL = 'mongodb://localhost:27017/mean-website';
mongoose.connect(dbURL, err => {
	if (err) {
		console.log('Error connecting DB: ', err);
	} else {
		console.log('## Connected to DB');
	}
});

//middleware
app.use(cors());
app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', appRoutes);

//Routes
// GET "HOME"
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, './public/app/views/index.html'));
});

// Starting Server
var port = process.env.PORT || 3000;
app.listen(port, err => {
	if (err) {
		console.log('## Error on instantiating server: ', err);
	}
	console.log('## Server listening on port ', port);
});

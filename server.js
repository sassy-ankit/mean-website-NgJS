var express = require('express');
var logger = require('morgan');
var cors = require('cors');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

// Definition of Routes

//middleware
app.use(logger('dev'));
app.use(cors());
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.get('/', (req, res) => {
	res.send('Hello World!');
});

// Starting Server
var port = process.env.PORT || 3000;
app.listen(port, err => {
	if (err) {
		console.log('Error on instantiating server: ', err);
	}
	console.log('Server listening on port ', port);
});

const express = require('express');

const authApp = express();

const Users = require('./users')

// parser session middleware
const parser = require('body-parser');

// pull in session middleware
const expressSession = require('express-session');

// use body parser
authApp.use(parser.json());

authApp.use(expressSession({
	secret: 'LOLSECRETZ'
}));

authApp.post('/auth/signup', (request, response) => {
	const {body} = request;

	// we want: email address
	// name
	// password

	const {email, name, password} = body;
	console.log(email, name, password);
	const isCreated = Users.createNewUser(email, name, password);

	response.header('Content-Type', 'application/json');
	if (isCreated) {
		response.send({success: true})
	}
	else {
		response.header('Content-Type', 'application/json');
		response.status(400)
		response.send({error: 'some fields not valid LOL'})
	}
});

// login route
authApp.post('/login', (request, response) => {
	console.log(request.session);
	if (typeof request.session.foo === "undefined") {
		request.session.foo = 0;
	}
	else {
		request.session.foo++;
	}
	response.send('IN LOGIN ROUTE ' + request.session.foo)
});

module.exports = authApp;




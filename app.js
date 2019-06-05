/* jshint esversion: 6 */

'use strict';

const express = require('express');//initialize express
const app = express();//create a new instance of express

const routes = require('./routes');//our routes folder

app.set('view engine', 'pug');//set the app view engine to pug
app.use('/static', express.static('public'));//set the public folder to be on the static server so the server does not try to interpolate it 
app.use(routes);//set the app to use the routes folder

app.use((req, res, next) => {
	const err = new Error('Page Not Found');//Create a new error with a message saying page not found
	err.status = 404;//change the status code to 404
	console.error(err.status);
	next(err);//call next passing the new error to be run at the next function with a error parameter
});

app.use((err, req, res, next) => {
	res.locals.error = err;//set the local error to the passed error
	res.status = err.status;//set the local res status to the passed error status
	res.render('error');//render the error page
});

app.listen(3000, () => {//start the server on port 3000
	console.log('The server is running on port 3000!');//log out the message that the server is running on port 3000
});
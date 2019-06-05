/* jshint esversion: 6 */

'use strict';

const express = require('express');//initialize a new instance of express
const router = express.Router();//a new instance of an express router

const { data } = require('../data.json');//set the project array in the object to an instance of a new array called projects
const { projects } = data;//create a new array out of the array of objects in the data var
const { skills } = data;

router.get('/', (req, res) => {
	res.locals.data = projects;//set the locals data to the projects array
	setTimeout(() => res.render('index'), 500);//render the index page//render the index page
});

router.get('/project/:id', (req, res, next) => {
	const { id } = req.params;//the id of the project to be shown
	let projectObject = null;
	//loop through the projects array to match the project with the id
	for (let i = 0; i < projects.length; i++) {
		if (projects[i].id === id) {//if the sent id matches the project id
			projectObject = projects[i];//set the projectObject to the matching id
			break;
		}
	}
	//if we dont find a matching project then create a 404 error
	if (projectObject === null) {
		const err = new Error('Page Not Found');
		err.status = 404;
		setTimeout(() => next(err), 500);//throw 404 error if nothing matches
	} else {
		res.locals.skills = skills;//pass the skills data
		setTimeout(() => res.render('project', projectObject), 500);//render the projects page with the projectObject
	}
});

router.get('/about', (req, res) => {
	setTimeout(() => res.render('about'), 500);
});

module.exports = router;//export the router const

const inquirer = require('inquirer');
const fs = require('fs');

const Employee = require('./lib/Employee');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

const employees = [];

// const generateHTML = () =>
// ``;

function startApp() {
	inquirer
		.prompt([
			{
				name: 'startApp',
				type: 'confirm',
				message: 'Would you like to assemble a team?',
			},
		])
		.then((res, err) => {
			if (err) console.error(err);
			if (res.startApp) {
				newMember();
			} else {
				process.exit();
			}
		});
}

function newMember() {
	inquirer
		.prompt([
			{
				name: 'empType',
				type: 'list',
				message: 'Please select member role:',
				choices: ['Manager', 'Engineer', 'Intern'],
			},
		])
		.then((res, err) => {
			if (err) console.error(err);
			console.log(res.empType);
			switch (res.empType) {
				case 'Manager':
					addManager();
					break;
				case 'Engineer':
					addEngineer();
					break;
				case 'Intern':
					addIntern();
					break;
			}
		});
}

function addManager() {
	inquirer
		.prompt([
			{
				name: 'name',
				type: 'input',
				message: 'What is your managers name?',
			},
			{
				name: 'id',
				type: 'input',
				message: "Enter Manager's Employee ID number",
			},
			{
				name: 'email',
				type: 'input',
				message: "Enter Manager's email address",
			},
			{
				name: 'officeNumber',
				type: 'input',
				message: "Enter Manager's office number",
			},
			{
				name: 'nextEmp',
				type: 'confirm',
				message: 'Would you like to add another employee?',
			},
		])
		.then((res, err) => {
			if (err) console.error(err);
			const newManager = new Manager(
				res.name,
				res.id,
				res.email,
				res.officeNumber
			);
			employees.push(newManager);
			console.log(employees);

			if (res.nextEmp) {
				newMember();
			} else {
				// return template function
			}
		});
}

function addEngineer() {
	inquirer
		.prompt([
			{
				name: 'name',
				type: 'input',
				message: "What is your Engineer's name?",
			},
			{
				name: 'id',
				type: 'input',
				message: "Enter Engineer's Employee ID number",
			},
			{
				name: 'email',
				type: 'input',
				message: "Enter Engineer's email address",
			},
			{
				name: 'gitHub',
				type: 'input',
				message: "Enter Engineer's GitHub username",
			},
			{
				name: 'nextEmp',
				type: 'confirm',
				message: 'Would you like to add another employee?',
			},
		])
		.then((res, err) => {
			if (err) console.error(err);
			const newEngineer = new Engineer(
				res.name,
				res.id,
				res.email,
				res.gitHub
			);
			employees.push(newEngineer);
			console.log(employees);

			if (res.nextEmp) {
				newMember();
			} else {
                // return template function
			}
		});
}

function addIntern() {
	inquirer
		.prompt([
			{
				name: 'name',
				type: 'input',
				message: "What is your Intern's name?",
			},
			{
				name: 'id',
				type: 'input',
				message: "Enter Intern's Employee ID number",
			},
			{
				name: 'email',
				type: 'input',
				message: "Enter Intern's email address",
			},
			{
				name: 'school',
				type: 'input',
				message: "Enter Intern's School",
			},
			{
				name: 'nextEmp',
				type: 'confirm',
				message: 'Would you like to add another employee?',
			},
		])
		.then((res, err) => {
			if (err) console.error(err);
			const newIntern = new Intern(
				res.name,
				res.id,
				res.email,
				res.school
			);
			employees.push(newIntern);
			console.log(employees);
			if (res.nextEmp) {
				newMember();
			} else {
				// return template function
			}
		});
}

startApp();
